using System;

namespace DatingApp.API.DTO
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public int Age { get; set; }   // DateOfBirth
        public DateTime Created { get; set; }
        public DateTime LastActivate { get; set; }
        public string KnownAs { get; set; }  // LookingFor
        public string City { get; set; } 
        public string Country { get; set; } 
        public string PhotoUrl { get; set; }

        public UserForListDto()
        {
            DateTime LastActivate = DateTime.Now;
        }

      
    }
}