using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Log_Product
    {
        public int Id { get; set; }
        public int IdProduct { get; set; }
        public int IdSize { get; set; }
        public int IdColor { get; set; } = 1;
        public DateTime CreatedDate { get; set; }
        public int Quantity { get; set; }
        public double ImportPrice { get; set; }
        public int CreatedById { get; set; }
    }
}
