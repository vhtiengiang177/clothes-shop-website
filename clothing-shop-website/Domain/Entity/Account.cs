using System.ComponentModel.DataAnnotations;

namespace Domain.Entity
{
    public class Account
    {
        public int Id { get; set; }
        public string Email { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public int State { get; set; } = 1; // 0: Delete, 1: Active, 2: Block
        public int VerificationCode { get; set; } = 0; // 1: Activate, another: No Activate
        public int IdTypeAccount { get; set; }
        public TypeAccount TypeAccount { get; set; }
        public Customer Customer { get; set; }
        public Staff Staff { get; set; }
    }
}