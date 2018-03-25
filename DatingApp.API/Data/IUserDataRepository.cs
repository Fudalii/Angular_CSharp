using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IUserDataRepository
    {
         void Add<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class ;
         Task<bool> SaveAll();
         
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);

         Task<Photos> GetPhotos(int id);

         Task<Photos> GetPhoto(int id);

         Task<Photos> GetMainPhotoForUser (int userid);

        
    }
}