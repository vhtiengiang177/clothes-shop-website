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
        public virtual ICollection<Product_Size> Product_Sizes { get; set; }
    }
}
