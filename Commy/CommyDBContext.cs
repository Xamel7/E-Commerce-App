using Commy.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Commy
{
    public class CommyDBContext : IdentityDbContext<ApplicationUser>
    {
        public  DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }
       

        public CommyDBContext(DbContextOptions options) : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            SeedRole(modelBuilder, "Admin", "create", "update", "delete", "read");
            var hasher = new PasswordHasher<ApplicationUser>();
            var AdminUser = new ApplicationUser
            {
                Id = "Admin-id",
                UserName = "Admin",
                NormalizedUserName = "ADMIN",
                Email = "ADMIN@example.com",
                NormalizedEmail = "ADMIN@EXAMPLE.COM",
                Password = "Password123!",
                Roles = new string[] { "Admin" },
                PasswordHash = hasher.HashPassword(null, "Password123!"),
            };
            //AdminUser.UserId = Guid.NewGuid();

            modelBuilder.Entity<ApplicationUser>().HasData(AdminUser);

            //modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            //{
            //    UserId = AdminUser.Id,
            //    RoleId = "Admin" // This should match the ID used in the SeedRole method for the Admin role
            //});

            // Generate the Editor role for the specified user

            SeedRole(modelBuilder, "Editor", "create", "update");
            var EditorUser = new ApplicationUser
            {
                Id = "Editor-id",
                UserName = "Editor",
                NormalizedUserName = "EDITOR",
                Email = "editor@example.com",
                NormalizedEmail = "editor@example.com",
                Password = "Password123!",
                Roles = new string[] { "Editor" },
                PasswordHash = hasher.HashPassword(null, "Password123!")

            };

            modelBuilder.Entity<ApplicationUser>().HasData(EditorUser);

            //modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            //{
            //    UserId = EditorUser.Id,
            //    RoleId = "Editor"

            //});

            //modelBuilder.Entity<Category>().HasOne<Product>(c => c.Category).WithMany(c => c.Products).HasForeignKey(c => c.CategoryId);
        }

        private int nextId = 1000;

        private void SeedRole(ModelBuilder modelBuilder, string roleName, params string[] permissions)
        {
            var role = new IdentityRole
            {
                Id = roleName.ToLower(),
                Name = roleName,
                NormalizedName = roleName.ToUpper(),
                ConcurrencyStamp = Guid.Empty.ToString()
            };

            modelBuilder.Entity<IdentityRole>().HasData(role);

            // Go through the permissions list (the params) and seed a new entry for each
            var roleClaims = permissions.Select(permission =>
              new IdentityRoleClaim<string>
              {
                  Id = nextId++,
                  RoleId = role.Id,
                  ClaimType = "permissions", // This matches what we did in Startup.cs
                  ClaimValue = permission
              }).ToArray();

            modelBuilder.Entity<IdentityRoleClaim<string>>().HasData(roleClaims);
        }

    }
}
