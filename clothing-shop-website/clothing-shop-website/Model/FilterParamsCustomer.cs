using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Model
{
    public class FilterParamsCustomer
    {
        public int? PageIndex { get; set; }
        public int? PageSize { get; set; }
        public string Sort { get; set; }
        public int IdCustomer { get; set; }
        public int []IdTypeCustomers { get; set; }
             
        public int MaxPoint { get; set; }
        public int MinPoint { get; set; }
        public string Content { get; set; }
    }
}
