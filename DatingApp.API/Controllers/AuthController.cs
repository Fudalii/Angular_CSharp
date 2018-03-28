
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
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
        private readonly IMapper _mapper;
        private readonly IUserDataRepository _userDataRepository;
        private readonly DataContext _dataContext;
        public AuthController(IAuthRepository repo, IMapper mapper, IUserDataRepository userDataRepository, DataContext dataContext)
        {
            _dataContext = dataContext;
            _userDataRepository = userDataRepository;
                _mapper = mapper;
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

         
         if (!ModelState.IsValid)
            return BadRequest(ModelState); 
          
            // create user
            var userToCreate = _mapper.Map<User>(userForRegister);

            var createUser = await _repo.Register(userToCreate, userForRegister.password);

            var userForReturn = _mapper.Map<UserForDetailsDto>(createUser);

           // return StatusCode(201);

            return CreatedAtRoute("GetUser", new {controller = "UserData", id = createUser.Id}, userForReturn);
        
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login ([FromBody] UserForLogin userForLogin)
        {
            var userFromRepo = await _repo.Login(userForLogin.username.ToLower(), userForLogin.password);

            if (userFromRepo == null)
            //return Unauthorized(); 
            return  BadRequest("Nie znaleziono użytkownika");

                    // var userToUpdate = await _userDataRepository.GetUser(userFromRepo.Id);
                    
                    // userToUpdate.LastActivate = DateTime.Now;

                    // await _userDataRepository.SaveAll();

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
           
            var userToRetturn = _mapper.Map<UserForListDto>(userFromRepo);

            return Ok(new { tokenString, userToRetturn });
        } 



    }
}