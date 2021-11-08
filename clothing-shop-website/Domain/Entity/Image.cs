using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Image
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int State { get; set; }
        public int IdProduct { get; set; }
        public Product Product { get; set; }

    }
}
