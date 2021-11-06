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
        public virtual Product Product { get; set; }
        public virtual Size Size { get; set; }
    }
}
