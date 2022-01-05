namespace clothing_shop_website.Model
{
    public class ResetPasswordParams
    {
        public string Email { get; set; }
        public string ResetCode { get; set; }
        public string Password { get; set; }
    }
}
