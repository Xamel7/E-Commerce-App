using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Commy;
using Commy.Models;

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
        public async Task<ActionResult> CreateCategory(string Name, string Description)
        {
            Category category = new Category(Name, Description);
            _context.Categories.Add(category);
            _context.SaveChanges();
            return Ok(category);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var categoryToDelete = _context.Categories.Find(id);
            if(categoryToDelete == null)
            {
                return NotFound();
            }
            _context.Categories.Remove(categoryToDelete);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            var existingCategory = _context.Categories.Find(id); 
            if (existingCategory == null)
            {
                return NotFound();
            }

            existingCategory.Name = category.Name;
            existingCategory.Description = category.Description;

            _context.Categories.Update(existingCategory);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
