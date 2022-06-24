using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Customer
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Image { get; set; }
        public string? PublicId { get; set; }
        public int Point { get; set; }
        public int IdAccount { get; set; }
        public int IdTypeCustomer { get; set; } = 3;
        public virtual Account Account { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual TypeCustomer TypeCustomer { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<DeliveryAddress> DeliveryAddresses { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
