using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Model
{
    public class ResponseJSON<T>
    {
        public int TotalData { get; set; }
        public List<T> Data { get; set; }
    }
}
