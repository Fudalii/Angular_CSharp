using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTO;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
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
        public async Task<IActionResult> GetUsers(){

            var users = await _repo.GetUsers();

            var usersForReturn = _mapper.Map<IList<UserForListDto>>(users);

            return  Ok(usersForReturn);
        } 


        [HttpGet("{id}")]
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


        [HttpPut("{id}")]
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

        }
        
    
}