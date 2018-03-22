using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class UserDataController : Controller
    {
        private readonly IUserDataRepository _userDataRepository;

        public UserDataController(IUserDataRepository userDataRepository)
        {
            _userDataRepository = userDataRepository;
            
        }

        [HttpGet ("users")]
        public async Task<IActionResult> GetUsers(){

            var users = await _userDataRepository.GetUsers();
            return  Ok(users);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id){

            var user = await _userDataRepository.GetUser(id);
           
           if (user != null)
           {
                return  Ok(user);
           }
           else {
               return Ok("Brak takeigo usera");
           }
        }


        
    }
}