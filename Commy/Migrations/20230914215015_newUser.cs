using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Commy.Migrations
{
    /// <inheritdoc />
    public partial class newUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoleClaims",
                keyColumn: "Id",
                keyValue: 1004);

            migrationBuilder.DeleteData(
                table: "AspNetRoleClaims",
                keyColumn: "Id",
                keyValue: 1005);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8adba57d-1837-4116-95c7-88b9c42f75e0");

            migrationBuilder.UpdateData(
                table: "AspNetRoleClaims",
                keyColumn: "Id",
                keyValue: 1006,
                column: "ClaimValue",
                value: "create");

            migrationBuilder.UpdateData(
                table: "AspNetRoleClaims",
                keyColumn: "Id",
                keyValue: 1007,
                column: "ClaimValue",
                value: "update");

            migrationBuilder.InsertData(
                table: "AspNetRoleClaims",
                columns: new[] { "Id", "ClaimType", "ClaimValue", "RoleId" },
                values: new object[,]
                {
                    { 1008, "permissions", "delete", "admin" },
                    { 1009, "permissions", "read", "admin" }
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "editor", "00000000-0000-0000-0000-000000000000", "Editor", "EDITOR" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "Password", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "249bdd6e-e92d-4bbc-b083-54987a10facd", 0, "e1770357-6466-4a4e-bf2d-c7bda022a9df", "ApplicationUser", null, false, false, null, "editor@example.com", "EDITOR", "Password123!", "AQAAAAIAAYagAAAAEIq1RZGdgBfxEnh1ffy6dsCNFlEU7gRNtOPAf35NfzdpVle97wTNeSfsexXjaeuNKQ==", null, false, "beb87065-fad9-4b4f-9cce-26ee711601dd", false, null },
                    { "85ab61ea-81dc-4ab6-ab65-1b57be2000f6", 0, "aad61c8a-26cd-41fe-a492-4e8f58914de1", "ApplicationUser", null, false, false, null, "ADMIN@EXAMPLE.COM", "ADMIN", "Password123!", "AQAAAAIAAYagAAAAEJ1UPcujebAgGDn3c9bHtYg8tu1MeAuyEMwMh3dHM/oHBSTMXc2Afz9eOYLrijvq7Q==", null, false, "f0fbc4f7-0975-4fcb-9c68-fd78a788d75d", false, null }
                });

            migrationBuilder.InsertData(
                table: "AspNetRoleClaims",
                columns: new[] { "Id", "ClaimType", "ClaimValue", "RoleId" },
                values: new object[,]
                {
                    { 1010, "permissions", "create", "editor" },
                    { 1011, "permissions", "update", "editor" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoleClaims",
                keyColumn: "Id",
                keyValue: 1008);

            migrationBuilder.DeleteData(
                table: "AspNetRoleClaims",
                keyColumn: "Id",
                keyValue: 1009);

            migrationBuilder.DeleteData(
                table: "AspNetRoleClaims",
                keyColumn: "Id",
                keyValue: 1010);

            migrationBuilder.DeleteData(
                table: "AspNetRoleClaims",
                keyColumn: "Id",
                keyValue: 1011);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "249bdd6e-e92d-4bbc-b083-54987a10facd");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "85ab61ea-81dc-4ab6-ab65-1b57be2000f6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "editor");

            migrationBuilder.UpdateData(
                table: "AspNetRoleClaims",
                keyColumn: "Id",
                keyValue: 1006,
                column: "ClaimValue",
                value: "delete");

            migrationBuilder.UpdateData(
                table: "AspNetRoleClaims",
                keyColumn: "Id",
                keyValue: 1007,
                column: "ClaimValue",
                value: "read");

            migrationBuilder.InsertData(
                table: "AspNetRoleClaims",
                columns: new[] { "Id", "ClaimType", "ClaimValue", "RoleId" },
                values: new object[,]
                {
                    { 1004, "permissions", "create", "admin" },
                    { 1005, "permissions", "update", "admin" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "Password", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "8adba57d-1837-4116-95c7-88b9c42f75e0", 0, "13a94101-0f9e-4f3f-a5a5-6367d384672f", "ApplicationUser", null, false, false, null, "ADMIN@EXAMPLE.COM", "ADMIN", "Password123!", "AQAAAAIAAYagAAAAEFLaUi8dNup4WiUaBb6h+a5Bbyx1/gHOzrb2NUpmMLpLRlJB78+NpNGUb8/U5/hotQ==", null, false, "b674c16f-725b-4033-9e21-4ba21be0603b", false, null });
        }
    }
}
