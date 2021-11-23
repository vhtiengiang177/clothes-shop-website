using System.ComponentModel.DataAnnotations;

namespace Domain.Entity
{
    public class Account
    {
        public int Id { get; set; }
        [Display(Name = "Email address")]
        //[Required(ErrorMessage = "The email address is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
        public string Email { get; set; }

       // [Required(ErrorMessage = "Password is required")]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters", MinimumLength = 12)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public int State { get; set; } = 1; // 0: Invalid, 1: Valid
        public string VerificationCode { get; set; }
        public int IdTypeAccount { get; set; }
        public TypeAccount TypeAccount { get; set; }
        public Customer Customer { get; set; }
        public Staff Staff { get; set; }
    }
}