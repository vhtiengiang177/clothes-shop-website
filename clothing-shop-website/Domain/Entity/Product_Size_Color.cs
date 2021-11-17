using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Product_Size_Color
    {
        public int IdProduct { get; set; }
        public int IdSize { get; set; }
        public int IdColor { get; set; } = 1;
        public double UnitPrice { get; set; }
        public int Stock { get; set; }
        public int State { get; set; }
        public virtual Color Color { get; set; }
        public virtual Product Product { get; set; }
        public virtual Size Size { get; set; }
    }
}
