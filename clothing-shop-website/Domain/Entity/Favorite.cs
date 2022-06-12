using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Favorite
    {
        public int IdAccount { get; set; }
        public int IdProduct { get; set; }
        public virtual Customer Customer { get; set; }
    }
}
