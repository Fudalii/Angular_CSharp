using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTO;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    public class UserDataController : Controller
    {
        private readonly IUserDataRepository _repo;
        private readonly IMapper _mapper;

        public UserDataController(IUserDataRepository userDataRepository, IMapper mapper)
        {
            _mapper = mapper;
            _repo = userDataRepository;
            
        }


        [HttpGet ("users")]
        public async Task<IActionResult> GetUsers(UserParams userParams){

            // Wykluczenie z listy włąsnego profilu
            var curentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            var userFromRepo = await _repo.GetUser(curentUserId);

            userParams.UserId = userFromRepo.Id; 
            

            if (string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }

           
            var users = await _repo.GetUsers(userParams);

            var usersForReturn = _mapper.Map<IList<UserForListDto>>(users);

            Response.AddPagination(users.CurentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return  Ok(usersForReturn);
        } 




        [HttpGet("{id}", Name="GetUser")]
        public async Task<IActionResult> GetUser(int id){

            var user = await _repo.GetUser(id);

            var userToRetturn = _mapper.Map<UserForDetailsDto>(user);
           
           if (user != null)
           {
                return  Ok(userToRetturn);
           }
           else {
               return Ok("Brak takeigo usera");
           }
        }


        [HttpPut("{id}", Name ="UpdateUser")]
        public async Task<IActionResult> UpdateUser ( int id, [FromBody] UserForUpdateDTO userForUpdate) 
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var curentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);   

            var userFromRepo = await _repo.GetUser(id);

            if (userFromRepo == null)
             return NotFound("Nie znaleziono usera o takim ID");

            if (curentUserId != userFromRepo.Id)
                return Unauthorized();

            _mapper.Map(userForUpdate, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            

            throw new Exception("Update Failed");

         }


         [HttpPost("{id}/like/{recipientId}")]
         public async Task<IActionResult> LikeUser(int id, int recipientId)
         {

            // sprawdzanie tokenu
             if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                    return Unauthorized();

            // sprawdzanie czy już istnieje taka relacja
            var like = await _repo.GetLike(id, recipientId);

            if (like != null)
                return BadRequest("You Alredy Like This User");
            
            // Sprawdzenie czy user jakiego chcemy polubić istnieje
            if (await _repo.GetUser(recipientId) == null)
                return NotFound();

            // jesli nie ma relacji i user o podanym id istnieje - towrzę instancję
            like = new Like 
                {
                    LikerId = id,
                    LikeeId = recipientId
                };

            // dodaję rekord do bazy 
            _repo.Add<Like>(like);

            if (await  _repo.SaveAll())
                return Ok();

            return BadRequest("Bład dodania usera do bazy");

         }

    }
        
    
}