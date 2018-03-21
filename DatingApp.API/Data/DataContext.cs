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


         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
                   
                    modelBuilder.Entity<Photos>()
                        .HasOne(p => p.User)
                        .WithMany(u => u.Photos);

                    base.OnModelCreating(modelBuilder);

        }



    }



}