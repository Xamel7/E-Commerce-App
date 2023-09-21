using Commy;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Commy.Models.Services;
using Commy.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddControllersWithViews();
builder.Services.AddControllersWithViews().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

string connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<CommyDBContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<CommyDBContext>()
            .AddDefaultTokenProviders();
builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<CommyDBContext>();

//builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<CommyDBContext>();


builder.Services.AddCors();

builder.Services.AddMvc();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        // Tell the authenticaion scheme "how/where" to validate the token + secret
        options.SaveToken = true;
        options.TokenValidationParameters = JwtTokenService.GetValidationParameters(builder.Configuration);
    });
builder.Services.AddAuthorization(options =>
{

    // Add "Name of Policy", and the Lambda returns a definition
    options.AddPolicy("Admin", policy =>
        policy.RequireClaim("permissions", "create", "update", "delete", "read")
            .RequireRole("Admin"));

    options.AddPolicy("Editor", policy =>
        policy.RequireClaim("permissions", "create", "update")
            .RequireRole("Editor"));
});

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.User.RequireUniqueEmail = false;
})
.AddEntityFrameworkStores<CommyDBContext>()
.AddRoleManager<RoleManager<IdentityRole>>()
.AddUserManager<UserManager<ApplicationUser>>()
.AddSignInManager<SignInManager<ApplicationUser>>()
.AddDefaultTokenProviders();


builder.Services.AddScoped<JwtTokenService>();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");
    endpoints.MapRazorPages();
});
    

app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.MapFallbackToFile("index.html");

app.Run();

