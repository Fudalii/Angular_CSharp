
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.DTO;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
     [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
                _repo = repo;
        }


    [HttpPost("register")]
    public async Task<IActionResult> register([FromBody] UserForRegister userForRegister)  {
            // validate request
           userForRegister.username = userForRegister.username.ToLower();

            if ( await _repo.UserExist(userForRegister.username) )
            return BadRequest("User exist in database!");
        
            // create user
            var userToCreate = new User() {UserName = userForRegister.username};

            var createUser = await _repo.Register(userToCreate, userForRegister.password);

            return StatusCode(201);
        
        }

    }
}