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
        public int TotalBuy { get; set; } = 0;
        public double UnitPrice { get; set; }
        public int State { get; set; } = 1;
        public DateTime CreatedDate { get; set; }
        public DateTime? LastModified { get; set; }
        public int CreatedById { get; set; }
        public int? ModifiedById { get; set; }
        public int? IdCategory { get; set; }
        public Category Category { get; set; }
        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<Product_Size_Color> Product_Sizes_Color { get; set; }
    }
}
