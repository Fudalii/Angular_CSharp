using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DatingApp.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Gender { get; set; }
        public string KnownAs { get; set; }
        public DateTime DateOfBirth { get; set; }   // date of birth from User.cs
        public DateTime Created { get; set; }
        public DateTime LastActivate { get; set; }
        public string LookingFor  { get; set; }  // LookinFor from User.cs
        public string Interests { get; set; } 
        public string City { get; set; } 
        public string Country { get; set; } 

        // One tu many Left
        public IList<Photos> Photos { get; set; }
      
     



    

     
    }
}