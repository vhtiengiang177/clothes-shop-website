using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Model
{
    public class CreateOrUpdateProductParams
    {
        public Product Product { get; set; }
        public int[] Colors { get; set; }
        public int[] Materials { get; set; }
        public int[] Size { get; set; }
    }
}
