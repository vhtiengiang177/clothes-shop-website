using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Product_Size
    {
        public int IdProduct { get; set; }
        public int IdSize { get; set; }
        public int IdColor { get; set; } = 1;
        public int Quantity { get; set; }
        public int UnitPrice { get; set; }
        public int TotalBuy { get; set; } = 0;
        public int Stock { get; set; }
        public virtual Color Color { get; set; }
        public virtual Product Product { get; set; }
        public virtual Size Size { get; set; }
    }
}
