using System;

namespace DatingApp.API.Models
{ 
    public class Photos
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public string PublicID { get; set; }

        // Many-to-one RIGHT
        public User User { get; set; }


    }

}