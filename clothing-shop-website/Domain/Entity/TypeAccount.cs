using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class TypeAccount
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int State { get; set; }
        public virtual ICollection<Account> Accounts { get; set; }
    }
}
