
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.DTO;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

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
        
        // User Exist ??
        if (string.IsNullOrEmpty(userForRegister.username))
             return BadRequest(ModelState);
             
         userForRegister.username = userForRegister.username.ToLower();

        if ( await _repo.UserExist(userForRegister.username) ){
          ModelState.AddModelError("Username", "Taki user już istnieje"); 
           return BadRequest("Taki user juz istnieje");
        }
            //return BadRequest(ModelState);
            //return BadRequest("User exist in database!");
        
        // validate request
         
         if (!ModelState.IsValid)
            return BadRequest(ModelState);

          
        // create user
            var userToCreate = new User() {UserName = userForRegister.username};

            var createUser = await _repo.Register(userToCreate, userForRegister.password);

            return StatusCode(201);
        
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login ([FromBody] UserForLogin userForLogin)
        {
            var userFromRepo = await _repo.Login(userForLogin.username.ToLower(), userForLogin.password);

            if (userFromRepo == null)
            //return Unauthorized();
            return  BadRequest("Nie znaleziono użytkownika");
            

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Super tajny Key Key Key");
             var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Name, userFromRepo.UserName)
                }),

                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { tokenString });
        }



    }
}