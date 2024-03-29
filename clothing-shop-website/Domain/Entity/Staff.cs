﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Staff
    {
        public int IdAccount { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string CardIdentity { get; set; } //CMND
        public string Phone { get; set; }
        public string? Image { get; set; }
        public string? PublicId { get; set; }
        public Account Account { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
