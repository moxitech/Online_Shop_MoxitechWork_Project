using Microsoft.EntityFrameworkCore;
using ReactMagazine.Models;

namespace ReactMagazine
{
    public class ProductsDbContext: DbContext
    {
        public DbSet<Product> Products { get; set; }
        public ProductsDbContext(DbContextOptions<ProductsDbContext> option) : base(option)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                    new Product { Id = 1, Name = "Колбаса", Description = "Свежая.", Price = 256.0 }
            );
        }



    }
}
