using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Model
{
    public class CreateAccountParams
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string NewEmail { get; set; }
        public string? Phone { get; set; }
        public DateTime? DOB { get; set; }
        public string CardIdentity { get; set;}
        public int IdTypeAccount { get; set; }
        public int TypeForm { get; set; }
        public string NewCard { get; set; }
        public string NewPhone { get; set; }
    }
}
