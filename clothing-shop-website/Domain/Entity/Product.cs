using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Product
    {
        public int Id { get; set; }
        public string Sku { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool State { get; set; }
        //public double Price { get; set; }
        //public int TotalBuy { get; set; } = 0;
        //public int Stock { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? LastModified { get; set; }
        public int CreatedById { get; set; }
        public int? ModifiedById { get; set; }
        public int? IdCategory { get; set; }
        public int? IdStyle { get; set; }
        public Category Category { get; set; }
        public Style Style { get; set; }
        public  Log_Product Log_Product { get; set; }

        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<Product_Color> Product_Colors { get; set; }
        public virtual ICollection<Product_Size> Product_Sizes { get; set; }
        public virtual ICollection<Product_Material> Product_Materials { get; set; }
    }
}
