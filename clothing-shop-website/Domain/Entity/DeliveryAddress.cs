using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class DeliveryAddress
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public int ProvinceId { get; set; }
        public int DistrictId { get; set; }
        public string WardCode { get; set; }
        public int IdCustomer { get; set; }
        public int State { get; set; } = 1;
        public Customer Customer { get; set; }
    }
}
