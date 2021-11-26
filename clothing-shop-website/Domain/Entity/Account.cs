using System.ComponentModel.DataAnnotations;

namespace Domain.Entity
{
    public class Account
    {
        public int Id { get; set; }
        [Display(Name = "Email address")]
        //[Required(ErrorMessage = "The email address is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

       // [Required(ErrorMessage = "Password is required")]
        [StringLength(255, ErrorMessage = "Must be between 6 and 255 characters", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public int State { get; set; } = 1; // 0: Delete, 1: Active
        public int VerificationCode { get; set; } = 0; // 1: Activate, another: No Activate
        public int IdTypeAccount { get; set; }
        public TypeAccount TypeAccount { get; set; }
        public Customer Customer { get; set; }
        public Staff Staff { get; set; }
    }
}