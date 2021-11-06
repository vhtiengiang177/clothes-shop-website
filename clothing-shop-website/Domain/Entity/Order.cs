﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime DateOrder { get; set; }
        public int TotalQuantity { get; set; }
        public double TotalProductPrice { get; set; }
        public double TotalAmount { get; set; }
        public int State { get; set; }
        public double FeeDelivery { get; set; }  
        public int IdAddress { get; set; }
        public int IdCustomer { get; set; }
        public int IdPromotion { get; set; }
        public int IdStaff { get; set; }
        public int IdShipper { get; set; }

        public DeliveryAddress DeliveryAddress { get; set; }
        public Customer Customer { get; set; }
        public Promotion Promotion { get; set; }
        public Staff Staff { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }

    }
}
