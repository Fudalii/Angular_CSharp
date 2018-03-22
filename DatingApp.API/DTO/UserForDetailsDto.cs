namespace DatingApp.API.DTO
{
    public class UserForDetailsDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }   
        public DateTime Created { get; set; }
        public DateTime LastActivate { get; set; }
        public string Introduction { get; set; } 
        public string LookingFor { get; set; } 
        public string Interests { get; set; } 
        public string City { get; set; } 
        public string Country { get; set; } 

        // One tu many Left
        public IList<Photos> Photos { get; set; }
      
    }
}