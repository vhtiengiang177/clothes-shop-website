using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entity
{
    public class Review
    {
        public int IdProduct { get; set; }
        public int IdUser { get; set; }
        public int IdOrder { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; } = 5;
        public DateTime Date { get; set; }

        public Customer Customer { get; set; }
        public Product Product { get; set; }
        public Order Order { get; set; }
    }
}
