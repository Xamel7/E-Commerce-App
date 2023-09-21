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
    public class ProductsController : Controller
    {
        private readonly CommyDBContext _context;

        public ProductsController(CommyDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> GetProduct()
        {
            var product = _context.Products.ToList();
            return product;
        }


        [HttpPost]
        [Authorize(Policy = "Admin")]
        [Authorize(Policy = "Editor")]
        public async Task<ActionResult> CreateProduct([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest("Invalid data provided. The 'category' object is null.");
            }

            if (string.IsNullOrWhiteSpace(product.Name))
            {
                return BadRequest("The 'name' field is required.");
            }

            // Optionally, you can perform additional validation here if needed.

            try
            {
                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                // Include the description field in the response
                var responseProduct = new
                {
                    Id = product.Id,
                    Name = product.Name,
                    Price = product.Price,
                    CategoryId = product.CategoryId,
                    Image = product.Image,
                };

                return CreatedAtAction("GetProducts", new { id = product.Id }, responseProduct);
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occur during database save.
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "Admin")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var ProductToDelete = _context.Products.Find(id);
            if (ProductToDelete == null)
            {
                return NotFound();
            }
            _context.Products.Remove(ProductToDelete);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "Admin")]
        [Authorize(Policy = "Editor")]
        public async Task<ActionResult> UpdateProduct(int id, [FromBody] Product updatedProduct)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            // Update properties of the existing category with values from updatedCategory
            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            product.CategoryId = updatedProduct.CategoryId;
            product.Image = updatedProduct.Image;

            _context.SaveChanges();

            return Ok(product);
        }
    }
}
