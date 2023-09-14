using Commy.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace Commy
{
    public class CommyDBContext : IdentityDbContext
    {
        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }
       

        public CommyDBContext(DbContextOptions options) : base(options)
        { }

    }
}
