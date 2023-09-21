using Commy.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Commy.Models.Services;

namespace Commy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;
        private JwtTokenService tokenService;
        public UsersController(UserManager<ApplicationUser> manager, JwtTokenService _tokenService, SignInManager<ApplicationUser> _signInManager)
        {
            userManager = manager;
            tokenService = _tokenService;
            signInManager = _signInManager;
        }
        // ROUTES
        [HttpPost("Register")]
        public async Task<ActionResult<ApplicationUser>> Register(ApplicationUser user)
        {
            // Note: data (RegisterUser) comes from an inbound DTO/Model created for this purpose
            // this.ModelState?  This comes from MVC Binding and shares an interface with the Model
            //var user = await userService.Register(data, this.ModelState);

            var result = await userManager.CreateAsync(user, user.Password);
            if (result.Succeeded)
            {
                // await userManager.AddToRolesAsync(user, user.Roles);
                // var name = HttpContext.User.Identity.Name;

                List<string> roles = new List<string>
                {
                    "Anonymous"
                };
                //await userManager.AddToRoleAsync(user, roles.ToString()); // Example role
                await signInManager.SignInAsync(user, null);

                return new ApplicationUser
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Token = await tokenService.GetToken(user, System.TimeSpan.FromMinutes(15)),
                    Roles = roles
                };

            }



            // What about our errors?
            foreach (var error in result.Errors)
            {
                var errorKey =
                    error.Code.Contains("Password") ? nameof(user.Password) :
                    error.Code.Contains("Email") ? nameof(user.Email) :
                    error.Code.Contains("UserName") ? nameof(user.UserName) :
                    "";
                ModelState.AddModelError(errorKey, error.Description);
            }



            if (ModelState.IsValid)
            {
                return user;
            }

            return BadRequest(new ValidationProblemDetails(ModelState));
        }
        [HttpPost("Login")]
        public async Task<ActionResult<ApplicationUser>> Login(ApplicationUser data)
        {

            var user = await userManager.FindByNameAsync(data.UserName);
            if (await userManager.CheckPasswordAsync(user, data.Password))
            {
                return new ApplicationUser()
                {
                    Id = user.Id,
                    UserName = user.UserName,
                };
            }
            if (user == null)
            {
                return Unauthorized();
            }
            return user;
        }

        [Authorize(Policy = "create")]
        [HttpGet("me")]
        public async Task<ApplicationUser> GetUser(ClaimsPrincipal principal)
        {
            var user = await userManager.GetUserAsync(principal);
            return new ApplicationUser
            {
                Id = user.Id,
                UserName = user.UserName
            };
        }

    }
}

