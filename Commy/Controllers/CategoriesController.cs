using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Commy;
using Commy.Models;
using Microsoft.AspNetCore.Authorization;

namespace Commy.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : Controller
    {
        private readonly CommyDBContext _context;

        public CategoriesController(CommyDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Category>> GetCategories()
        {
            var categories = _context.Categories.ToList();
            return categories;
        }



        [HttpPost]
        public async Task<ActionResult> CreateCategory([FromBody] Category category)
        {
            if (category == null)
            {
                return BadRequest("Invalid data provided. The 'category' object is null.");
            }

            if (string.IsNullOrWhiteSpace(category.Name))
            {
                return BadRequest("The 'name' field is required.");
            }

            // Optionally, you can perform additional validation here if needed.

            try
            {
                _context.Categories.Add(category);
                await _context.SaveChangesAsync();

                // Include the description field in the response
                var responseCategory = new
                {
                    Id = category.Id,
                    Name = category.Name,
                    Description = category.Description
                };

                return CreatedAtAction("GetCategories", new { id = category.Id }, responseCategory);
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occur during database save.
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "Admin")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var categoryToDelete = _context.Categories.Find(id);
            if (categoryToDelete == null)
            {
                return NotFound();
            }
            _context.Categories.Remove(categoryToDelete);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCategory(int id, [FromBody] Category updatedCategory)
        {
            var category = _context.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            // Update properties of the existing category with values from updatedCategory
            category.Name = updatedCategory.Name;
            category.Description = updatedCategory.Description;

            _context.SaveChanges();

            return Ok(category);
        }
    }
}
