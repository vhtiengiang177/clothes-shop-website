using clothing_shop_website.Model;
using clothing_shop_website.Services;
using Domain.Entity;
using Infrastructure.Persistent;
using Infrastructure.Persistent.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace clothing_shop_website.Areas.Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private IConfiguration _configuration;
        private UnitOfWork _unitOfWork;
        private AccountService _accountsService;

        public AuthenticationController(IConfiguration configuration, DataDbContext dataDbContext, AccountService accountsService)
        {
            this._configuration = configuration;
            _unitOfWork = new UnitOfWork(dataDbContext);
            _accountsService = accountsService;
        }

        [HttpPost]
        public async Task<ActionResult> Login([FromBody] Account account)
        {
            var user = await _unitOfWork.AccountsRepository.Login(account.Email, _accountsService.MD5Hash(account.Password));
            string firstNameUser = "";
            if (user != null && user.State == 1)
            {
                if (user.IdTypeAccount == 4) // Customer
                {
                    var customer = _unitOfWork.CustomersRepository.GetCustomerByID(user.Id);
                    firstNameUser = customer.FirstName;
                }
                else if (user.IdTypeAccount != 4)
                {
                    var staff = _unitOfWork.StaffRepository.GetStaffByID(user.Id);
                    firstNameUser = staff.FirstName;
                }

                if (user.VerificationCode == 1)
                {
                    var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("id", user.Id.ToString()),
                    new Claim("firstNameUser", firstNameUser),
                    new Claim("idTypeAccount", user.IdTypeAccount.ToString()),
                    new Claim("provider", "ACCOUNT")
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddDays(10),
                        signingCredentials: signIn);

                    var response = new
                    {
                        isVerify = true,
                        token = new JwtSecurityTokenHandler().WriteToken(token)
                    };

                    return Ok(response);
                }
                else
                {
                    _accountsService.SendVerificationCode(user, firstNameUser);

                    var response = new
                    {
                        isVerify = false,
                        id = user.Id
                    };

                    return Ok(response);
                }
            }
            else
            {
                return BadRequest("Invalid credentials");
            }
        }

        [HttpGet("VerifyAccount/{idAccount}")]
        public IActionResult VerifyAccount(int idAccount, [FromQuery] int VerificationCode)
        {
            var user = _unitOfWork.AccountsRepository.GetAccountByID(idAccount);
            string firstNameUser = "";
            if(user != null)
            {
                if (_unitOfWork.AccountsRepository.VerifyAccount(VerificationCode, user))
                {
                    _unitOfWork.Save();

                    if (user.IdTypeAccount == 4 && user.State == 1) // Customer
                    {
                        var customer = _unitOfWork.CustomersRepository.GetCustomerByID(user.Id);
                        firstNameUser = customer.FirstName;
                    }
                    else if (user.IdTypeAccount != 4)
                    {
                        var staff = _unitOfWork.StaffRepository.GetStaffByID(user.Id);
                        firstNameUser = staff.FirstName;
                    }

                    var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("id", user.Id.ToString()),
                    new Claim("firstNameUser", firstNameUser),
                    new Claim("idTypeAccount", user.IdTypeAccount.ToString()),
                    new Claim("provider", "ACCOUNT")
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddDays(10),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else return BadRequest("Verification Code is wrong!");
            }
            return BadRequest("Not Found"); // Fix sang return NotFound
        }

        [HttpGet("ResendVerificationCode/{idAccount}")]
        public IActionResult ResendVerificationCode(int idAccount)
        {
            var user = _unitOfWork.AccountsRepository.GetAccountByID(idAccount);
            string firstNameUser = "";
            if (user != null)
            {
                if (user.VerificationCode == 1)
                    return Ok("You're verified!");
                else
                {
                    if (user.IdTypeAccount == 4 && user.State == 1) // Customer
                    {
                        var customer = _unitOfWork.CustomersRepository.GetCustomerByID(user.Id);
                        firstNameUser = customer.FirstName;
                    }
                    else if (user.IdTypeAccount != 4)
                    {
                        var staff = _unitOfWork.StaffRepository.GetStaffByID(user.Id);
                        firstNameUser = staff.FirstName;
                    }

                    Random generator = new Random();
                    int verificationCode = generator.Next(100000, 1000000);
                    user.VerificationCode = verificationCode;
                    _unitOfWork.AccountsRepository.UpdateAccount(user);
                    _unitOfWork.Save();

                    _accountsService.SendVerificationCode(user, firstNameUser);

                    return Ok("Resend successfully. Check your email account!");
                }
            }
            return BadRequest("Not Found"); // Fix sang return NotFound
        }

        [HttpPost("LoginWithGoogle")]
        public ActionResult LoginWithGoogle([FromBody] GoogleUser user)
        {
            Account accountGoogle = _unitOfWork.AccountsRepository.IsExistEmailActivate(user.Email);

            if (accountGoogle == null)
            {
                Account account = new Account();
                account.Email = user.Email;
                account.Password = null;
                account.IdTypeAccount = 4;
                account.VerificationCode = 1;

                Customer customer = new Customer();
                customer.LastName = user.LastName;
                customer.FirstName = user.FirstName;
                customer.Image = user.PhotoUrl;


                accountGoogle = _unitOfWork.AccountsRepository.CreateAccount(account, customer, null);
                if (_unitOfWork.Save() == false)
                {
                    return BadRequest("Failed.");
                }
            }

            var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("id", accountGoogle.Id.ToString()),
                    new Claim("firstNameUser", user.FirstName),
                    new Claim("idTypeAccount", accountGoogle.IdTypeAccount.ToString()),
                    new Claim("provider", "GOOGLE")
                    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddDays(10),
                signingCredentials: signIn);

            return Ok(new JwtSecurityTokenHandler().WriteToken(token));
        }

        [HttpGet("SendEmailResetPassword")]
        public ActionResult SendEmailResetPassword([FromQuery] string email)
        {
            var isExistsEmail = _unitOfWork.AccountsRepository.IsExistEmail(email);

            if (isExistsEmail == false)
            {
                return BadRequest("Email account does not exist");
            }
            else
            {
                var account = _unitOfWork.AccountsRepository.GetAccountByEmail(email);

                if (account.State == 0)
                {
                    return BadRequest("Email account has been locked. If you want to unlock, please contact mango.clothes2021@gmail.com");
                }
                else if (account.State == 2)
                {
                    return BadRequest("Email account does not exist");
                }
                else
                {
                    var firstName = _unitOfWork.AccountsRepository.GetFirstNameByEmail(email);

                    var randomString = Guid.NewGuid().ToString("n").Substring(0, 8).ToUpper();

                    if (account != null)
                    {
                        account.ResetPasswordCode = randomString;
                        _unitOfWork.AccountsRepository.UpdateAccount(account);
                        _accountsService.SendResetPasswordCode(email, firstName, randomString);
                        _unitOfWork.Save();
                    }

                    return Ok();
                }

            }
        }

        [HttpPost("ResetPassword")]
        public IActionResult ResetPassword([FromBody] ResetPasswordParams resetPasswordParams)
        {
            var account = _unitOfWork.AccountsRepository.GetAccountByEmail(resetPasswordParams.Email);

            if (account.ResetPasswordCode != resetPasswordParams.ResetCode)
                return BadRequest("Incorrect Reset Code");
            account.Password = _accountsService.MD5Hash(resetPasswordParams.Password);
            account.ResetPasswordCode = null;

            _unitOfWork.AccountsRepository.UpdateAccount(account);

            if (_unitOfWork.Save())
                return Ok();
            else return BadRequest("Something went wrong!");
        }
    }
}
