using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class UserDataRepository : IUserDataRepository
    {
        private readonly DataContext _context;

        
       
        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
           var users = _context.Users.Include(p => p.Photos);
           return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<User> GetUser(int id)
        {
           var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
           
           return user;
        }
        

        public UserDataRepository(DataContext context)
        {
            _context = context;
            
        }
        public void Add<T>(T entity) where T : class
        {
           _context.Add(entity); 
            
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }


        public async Task<bool> SaveAll()
        {
           return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Photos> GetPhotos(int id)
        {
           return await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Photos> GetPhoto(int id)
        {
            return await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
        }

          public async Task<Photos> GetMainPhotoForUser(int userId) {

              return await _context.Photos.Where(p => p.IsMain).FirstOrDefaultAsync(p => p.User.Id == userId);
           
              
          }

    }
}