using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Model
{
    public class CreateAccountParams
    {
        public Account Account { get; set; }
        public Customer Customer { get; set; }
        public Staff Staff { get; set; }
    }
}
