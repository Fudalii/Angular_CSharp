
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
        private readonly DataContext _conetxt;
        private Cloudinary _cloudinary;

        public PhotosController(
            IUserDataRepository repo, 
            IMapper mapper, 
            IOptions<CloudinarySettings> cloudinaryConfig,
            DataContext conetxt )
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;
            _conetxt = conetxt;
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

            //Przesłany plik 
            var file = photoDTO.File; // Present file in HTTP REQUEST

            // ImagUpLoadResult  to tez klasa Cloudinary
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0 )
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(1000).Height(1000).Crop("fill").Gravity("face")
                    };
                    // wysyłamy zdjęcie do Cloudinary 
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


        [HttpPost("{id}/isMain")]
        public async Task<IActionResult> SetMainPhoto(int userid, int id)
        {
            if (userid != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var photoFromRepo = await _repo.GetPhotos(id);

            if (photoFromRepo == null)
                return NotFound();

            if(photoFromRepo.IsMain)
                return BadRequest("This foto alredy is Main");

            var curentMainPhoto = await _repo.GetMainPhotoForUser(userid);

            if (curentMainPhoto != null)
                curentMainPhoto.IsMain = false;

            photoFromRepo.IsMain = true;

            if (await _repo.SaveAll())
                return NoContent(); 
            
            return BadRequest("ble ble ble");
             
        }
      

        




        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var photoFromRepo = await _repo.GetPhoto(id);
            if (photoFromRepo == null)
                return NotFound();

            if (photoFromRepo.IsMain)
                return BadRequest("You cannot delete the main photo");

            if (photoFromRepo.PublicID != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicID);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                    _repo.Delete(photoFromRepo);
            }

            if (photoFromRepo.PublicID == null)
            {
                _repo.Delete(photoFromRepo);
            }

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the photo");
        }
    }
  
    
}