using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class OrderDetail
    {
        // public int Id { get; set; }
        public int IdOrder { get; set; }
        public int IdProduct { get; set; }
        public double UnitPrice { get; set; }
        public int Quantity { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string Material { get; set; }
        public virtual Product Product { get; set; }
        public virtual Order Order { get; set; }

    }
}
