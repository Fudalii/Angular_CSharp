using System.Collections.Generic;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _dataContext;

        public Seed(DataContext dataContext)
        {
            _dataContext = dataContext;
            
        }

        public void SeedUsers (){

            // _dataContext.Users.RemoveRange(_dataContext.Users);
            // _dataContext.SaveChanges();

            //Seed users ang Generate password

            var userData = System.IO.File.ReadAllText("./Data/SeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);

            foreach (var user in users)
            {     
                 byte[] passwordHash, passwordSalt;
                 CreatePasswordHash("password", out passwordHash, out passwordSalt);

                  user.PasswordHash = passwordHash;
                  user.PasswordSalt = passwordSalt;

                  _dataContext.Add(user);
                  _dataContext.SaveChanges();
            }



        }


         private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
            {
               using (var hmac = new System.Security.Cryptography.HMACSHA512())  // new System.Security.Cryptography.HMACSHA512())
               {
                    passwordSalt = hmac.Key;
                    passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
               }
            }

        
    }
}