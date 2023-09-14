using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Commy.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public float? Price { get; set; }
        public string Image { get; set; }
        


        [ForeignKey("CategoryId")]
        public int CategoryId { get; set; }

        public Product(string name, float? price, int categoryId, string image)
        {
            Name = name;
            Price = price;
            CategoryId = categoryId;
            Image = image;
        }
    }
}
