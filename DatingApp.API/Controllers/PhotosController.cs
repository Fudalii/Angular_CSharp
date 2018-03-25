
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.DTO;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IUserDataRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotosController(IUserDataRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig )
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

           _cloudinary = new Cloudinary(acc);
            // Account pochodzi z Using: Cloudinary
        }


        [HttpPost]
        public  async Task<IActionResult> AddPhotoForUser(int userId, PhotoForCreationDTO photoDTO)
        {
            var user = await _repo.GetUser(userId);

            if (user == null)
                return BadRequest("Nie znaleziono takiego uzytkownika");

            var curentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (user.Id != curentUserId)
                return Unauthorized();


            var file = photoDTO.File; // Present file in HTTP REQUEST

            // ImagUpLoadResult  to tez klasa Cloudinary
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0 )
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream)
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }  

            photoDTO.Url = uploadResult.Uri.ToString();
            photoDTO.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photos>(photoDTO);

            photo.User = user;

            if (!user.Photos.Any( m => m.IsMain))
            {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);

            var photoToReturn = _mapper.Map<PhotoForReturnDTO>(photo);

            if (await _repo.SaveAll())
            {
                return CreatedAtRoute("GetPhoto", new {id = photo.Id}, photoToReturn);  // TUTAJ WSTAWIONY będzie przekierowanie do GetPhoto
            }

            return BadRequest("Nie można dodać foto");

            
        }


        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int Id)
        {
            var photFromRepo = await _repo.GetPhotos(Id);

            var photo = _mapper.Map<PhotoForReturnDTO>(photFromRepo);

            return Ok(photo);
        }   

     
       
        
    }
}