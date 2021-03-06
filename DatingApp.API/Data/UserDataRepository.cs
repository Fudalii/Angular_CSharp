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
           var users = _context.Users
                .Include(p => p.Photos)
                .OrderByDescending(u => u.Created)
                .AsQueryable();

           users = users.Where(u => u.Id != userParams.UserId);  // Wykluczenie z listy włąsnego profilu dlatego !=

           users = users.Where(u => u.Gender == userParams.Gender);

            if (userParams.Likees)
            {
                users = users.Where(u => u.Liker.Any(liker => liker.LikerId == u.Id ));
            }


            if (userParams.Likers)
            {
                users = users.Where(u => u.Likee.Any(liker => liker.LikeeId == u.Id ));
            }




           if (userParams.MinAge != 18 || userParams.MaxAge != 99)
           {
              users = users.Where(u => u.DateOfBirth.CalculateAge() >= userParams.MinAge
              && u.DateOfBirth.CalculateAge() <= userParams.MaxAge);
           }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created" : 
                        users = users.OrderByDescending(u => u.Created);
                        break;

                    case "last" : 
                        users = users.OrderByDescending(u => u.LastActivate);
                        break;

                    default:
                        users = users.OrderByDescending(u => u.LastActivate);
                        break;
                }
            }


           return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }


        private async Task<IEnumerable<Like>> GetUserLikes(int id, bool likers)
        {
                var user = await _context.Users
                            .Include(x => x.Likee)
                            .Include(x => x.Liker)
                            .FirstOrDefaultAsync(u => u.Id == id);
                if (likers)
                {
                    return user.Likee.Where(u => u.LikeeId == id);
                } else {
                    return user.Liker.Where(u => u.LikerId == id);
                }
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


        public async Task<Like> GetLike(int userId, int recipientId)
        {
            
            return await _context.Like.FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == recipientId);
        }






    }
}