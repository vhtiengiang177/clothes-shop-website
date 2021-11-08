using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class OrderDetail
    {
        public int IdOrder { get; set; }
        public int IdProduct { get; set; }
        public int IdSize { get; set; }
        public int IdColor { get; set; }
        public double UnitPrice { get; set; }
        public int Quantity { get; set; }
        public string Material { get; set; }
        public virtual Product Product { get; set; }
        public virtual Order Order { get; set; }
        public virtual Size Size { get; set; }
        public virtual Color Color { get; set; }

    }
}
