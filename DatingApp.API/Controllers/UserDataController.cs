using System.Collections.Generic;
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
        private readonly IUserDataRepository _userDataRepository;
        private readonly IMapper _mapper;

        public UserDataController(IUserDataRepository userDataRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userDataRepository = userDataRepository;
            
        }

        [HttpGet ("users")]
        public async Task<IActionResult> GetUsers(){

            var users = await _userDataRepository.GetUsers();

            var usersForReturn = _mapper.Map<IList<UserForListDto>>(users);

            return  Ok(usersForReturn);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id){

            var user = await _userDataRepository.GetUser(id);

            var userToRetturn = _mapper.Map<UserForDetailsDto>(user);
           
           if (user != null)
           {
                return  Ok(userToRetturn);
           }
           else {
               return Ok("Brak takeigo usera");
           }
        }


        
    }
}