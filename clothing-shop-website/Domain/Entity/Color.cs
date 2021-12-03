﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Color
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ColorCode { get; set; }
        public int State { get; set; } = 1;
        public virtual ICollection<Product_Size_Color> Product_Sizes_Color { get; set; }
    }
}
