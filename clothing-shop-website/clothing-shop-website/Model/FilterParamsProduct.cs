﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Model
{
    public class FilterParamsProduct
    {
        public int? PageIndex { get; set; }
        public int? PageSize { get; set; }
        public string Sort { get; set; }
        public int[] IdCategories { get; set; }
        public int IdProduct { get; set; }
        public double? MinPrice { get; set; }
        public double? MaxPrice { get; set; }
        public string Content { get; set; }
    }
}
