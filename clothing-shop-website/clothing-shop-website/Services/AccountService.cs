using clothing_shop_website.Model;
using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace clothing_shop_website.Services
{
    public class AccountService
    {
        public IQueryable<Account> SortListAccount(string sort, IQueryable<Account> lAccount)
        {
            switch (sort)
            {
                case "state:desc":
                    lAccount = lAccount.OrderByDescending(p => p.State).AsQueryable();
                    break;
                case "state:asc":
                    lAccount = lAccount.OrderBy(p => p.State).AsQueryable();
                    break;
                case "email:desc":
                    lAccount = lAccount.OrderByDescending(p => p.Email).AsQueryable();
                    break;
                case "email:asc":
                    lAccount = lAccount.OrderBy(p => p.Email).AsQueryable();
                    break;
                case "id:asc":
                    lAccount = lAccount.OrderBy(p => p.Id).AsQueryable();
                    break;
                default:
                    lAccount = lAccount.OrderByDescending(p => p.Id).AsQueryable();
                    break;
            }

            return lAccount;
        }

        public IQueryable<Account> FilterAccount(FilterParamsAccount filterParams, IQueryable<Account> lAccount)
        {
            if (filterParams.Content != null)
                lAccount = lAccount.Where(p => p.Email.ToLower().Contains(filterParams.Content.ToLower()));
            return lAccount.AsQueryable();
        }

        public void SendVerificationCode(Account account, string firstName)
        {
            var subject = "[MANGO CLOTHES] Verify your account";
            var body = "<div> Hello " + firstName + ",</div> <br/>" +

                        "<div> You registered an account on Mango Clothes, before being able to use your account " 
                        + "you need to verify account. </div>" 
                        + "<br/>"
                        + "Your code: <strong>" + account.VerificationCode + "</strong>"
                        + "<br/>"
                        + "Have a nice day!"
                        + "<br/><br/>" +

            "Thanks & Best Regards, <br/> Mango Clothes.";
            SendEmail(account.Email, body, subject);
        }

        public void SendEmail(string emailAddress, string body, string subject)
        {
            using (MailMessage mm = new MailMessage("mango.clothes2021@gmail.com", emailAddress))
            {
                mm.Subject = subject;
                mm.Body = body;

                mm.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                NetworkCredential NetworkCred = new NetworkCredential("mango.clothes2021@gmail.com", "Vf|ITI3[");

                smtp.Credentials = NetworkCred;
                smtp.Port = 587;
                smtp.Send(mm);
            }
        }

        public string MD5Hash(string text)
        {
            MD5 md5 = new MD5CryptoServiceProvider();

            //compute hash from the bytes of text  
            md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(text));

            //get hash result after compute it  
            byte[] result = md5.Hash;

            StringBuilder strBuilder = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                //change it into 2 hexadecimal digits  
                //for each byte  
                strBuilder.Append(result[i].ToString("x2"));
            }

            return strBuilder.ToString();
        }
    }
}
