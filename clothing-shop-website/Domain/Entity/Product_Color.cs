using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Product_Color
    {
        public int IdProduct { get; set; }
        public int IdColor { get; set; }
        public virtual Product Product { get; set; }
        public virtual Color Color { get; set; }
    }
}
