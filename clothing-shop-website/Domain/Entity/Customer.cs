using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Customer
    {
       // public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int VerifyEmail { get; set; }
        public int Point { get; set; }
        public int State { get; set; }
        public int IdAccount { get; set; }
        //public int IdCart { get; set; }
        public int IdTypeCustomer { get; set; }
        public Account Account { get; set; }
        public Cart Cart { get; set; }
        public TypeCustomer TypeCustomer { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<DeliveryAddress> DeliveryAddresses { get; set; }
    }
}
