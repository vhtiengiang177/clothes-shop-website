using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Color
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Product_Color> Product_Colors { get; set; }
    }
}
