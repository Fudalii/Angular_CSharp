using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTO
{
    public class UserForRegister
    {
        [Required]
        [MinLength(7, ErrorMessage="Minimum 7 znaków")]
        public string username { get; set; }

        [Required]
        [StringLength(8, MinimumLength=4, ErrorMessage="Hasło minimum 4 max 8 znaków")]
        public string password { get; set; }

        [Required]
        public string  gender { get; set; }
        
        [Required]
        public string  knownAs { get; set; }

        [Required]
        public DateTime dateOfBirth {get; set; }
        
        [Required]
        public string city { get; set; }
        
        [Required]
        public string country { get; set; }

        public DateTime created {get; set;}

        public DateTime lastActivate { get; set; }

        public UserForRegister()
        {
            created = DateTime.Now;
            lastActivate = DateTime.Now;
        }


    }
}