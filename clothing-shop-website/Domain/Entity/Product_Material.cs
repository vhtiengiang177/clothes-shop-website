using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Product_Material
    {
        public int IdProduct { get; set; }
        public int IdMaterial { get; set; }
        public virtual Product Product { get; set; }
        public virtual Material Material { get; set; }
    }
}
