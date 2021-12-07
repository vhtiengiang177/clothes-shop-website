using System.Collections.Generic;

namespace Domain.Entity
{
    public class Cart
    {
        public int IdCustomer { get; set; }
        public int IdProduct { get; set; }
        public int IdSize { get; set; }
        public int IdColor { get; set; } 
        public int Quantity { get; set; }
        public virtual Customer Customer { get; set; }
    }
}