using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.DTO
{
    public class PhotoForCreationDTO
    {
        public string Url { get; set; }
        
        public IFormFile File { get; set; }  //Represent file sent with http request
        public string Description { get; set; }
        public DateTime DateAdded { get; set; } 
        public string PublicId { get; set; }  

        public PhotoForCreationDTO()
        {
            DateAdded = DateTime.Now;
        }
        
    }
}