using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Size
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int State { get; set; } = 1;
        public virtual ICollection<Product_Size_Color> Product_Sizes { get; set; }
    }
}
