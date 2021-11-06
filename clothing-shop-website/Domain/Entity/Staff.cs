﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Staff
    {
        //public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string CardIdentity { get; set; } //CMND
        public string Phone { get; set; }
        public string Image { get; set; }
        public int State { get; set; }
        public int IdAccount { get; set; }
        public int IdOrder { get; set; }
        public Account Account { get; set; }
        public Order Order { get; set; }
    }
}
