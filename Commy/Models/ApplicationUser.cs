using System;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Commy.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Id { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        [NotMapped]
        public string? Token { get; set; }
        [NotMapped]
        public IList<string>? Roles { get; set; }
    }
}
