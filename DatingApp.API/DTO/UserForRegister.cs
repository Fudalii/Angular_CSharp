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
    }
}