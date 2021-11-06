using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Material
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Product_Material> Product_Material { get; set; }
    }
}
