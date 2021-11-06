using System;
using System.Collections.Generic;

namespace Domain.Entity
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public bool State { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? LastModified { get; set; }
        public int CreatedById { get; set; }
        public int? ModifiedById { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}