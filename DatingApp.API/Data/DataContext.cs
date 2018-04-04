using DatingApp.API.Models;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Value> Value { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photos> Photos { get; set; }  
        public DbSet<Like> Like { get; set; }  


         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
                   
                    modelBuilder.Entity<Photos>()
                        .HasOne(p => p.User)
                        .WithMany(u => u.Photos)
                        .IsRequired();

                    modelBuilder.Entity<Like>()
                        .HasKey( k => new {k.LikeeId, k.LikerId});

                    modelBuilder.Entity<Like>()
                        .HasOne(u => u.Likee)
                        .WithMany(u => u.Liker)
                        .HasForeignKey(u => u.LikerId)
                        .OnDelete(DeleteBehavior.Restrict);

                    modelBuilder.Entity<Like>()
                        .HasOne(u => u.Liker)
                        .WithMany(u => u.Likee)
                        .HasForeignKey(u => u.LikeeId)
                        .OnDelete(DeleteBehavior.Restrict);    
                        


                    base.OnModelCreating(modelBuilder);

        }



    }



}