﻿using clothing_shop_website.Interface;
using clothing_shop_website.Model;
using clothing_shop_website.Services;
using Domain.Entity;
using Infrastructure.Persistent;
using Infrastructure.Persistent.UnitOfWork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Areas.Admin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        private AccountService _accountsService;
        private IImageService _imageService;
        public AccountsController(DataDbContext dbContext, AccountService accountsService, IImageService imageService)
        {
            _unitOfWork = new UnitOfWork(dbContext);
            _accountsService = accountsService;
            _imageService = imageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAccount([FromQuery] FilterParamsAccount filterParams)
        {
            try
            {
                int currentPageIndex = filterParams.PageIndex ?? 1;
                int currentPageSize = filterParams.PageSize ?? 5;

                IQueryable<Account> lAccountItems;

                if (filterParams.IdTypeAccount != null)
                {
                    if (filterParams.IdTypeAccount.Count() != 0
                        || filterParams.IdTypeAccount.Count() != 4)
                    {
                        lAccountItems = _unitOfWork.AccountsRepository.GetAccountsByTypeAccountsID(filterParams.IdTypeAccount);
                    }
                    else lAccountItems = await _unitOfWork.AccountsRepository.GetAllAccounts();
                }
                else lAccountItems = await _unitOfWork.AccountsRepository.GetAllAccounts();

                lAccountItems = _accountsService.FilterAccount(filterParams, lAccountItems);

                var lAccount = _accountsService.SortListAccount(filterParams.Sort, lAccountItems);

                var response = new ResponseJSON<Account>
                {
                    TotalData = lAccount.Count(),
                    Data = lAccountItems.Skip((currentPageIndex - 1) * currentPageSize).Take(currentPageSize).ToList()
                };

                return Ok(response);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("GetAccountByID/{id}")]
        public IActionResult GetAccountByID(int id)
        {
            var account = _unitOfWork.AccountsRepository.GetAccountByID(id);

            if (account == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(account);
            }
        }

        [AllowAnonymous]
        [HttpGet("GetAccountByEmail/{email}")]
        public IActionResult GetAccountByEmail(string email)
        {
            var account = _unitOfWork.AccountsRepository.GetAccountByEmail(email);

            if (account == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(account);
            }
        }

        [HttpPost("CreateAccount")]
        public IActionResult CreateAccount([FromBody] CreateAccountParams createAccountParams)
        {
            if (ModelState.IsValid)
            {
                var oldAccount = _unitOfWork.AccountsRepository.GetAccountByEmail(createAccountParams.Email);

                if (createAccountParams.TypeForm==0 && oldAccount != null)
                {
                    return BadRequest("Email is exist.");
                }

                Random generator = new Random();
                int verificationCode = generator.Next(100000, 1000000);

                if (oldAccount == null
                    )
                {
                    if (_unitOfWork.AccountsRepository.IsExistCardIdentity(createAccountParams.CardIdentity))
                        return BadRequest("Card Identity is exist.");

                    if (_unitOfWork.AccountsRepository.IsExistPhone(createAccountParams.Phone))
                        return BadRequest("Phone is exist.");

                    Account account = new Account();
                    account.Email = createAccountParams.Email;
                    account.Password = _accountsService.MD5Hash(createAccountParams.CardIdentity);
                    account.IdTypeAccount = createAccountParams.IdTypeAccount;
                    account.VerificationCode = verificationCode;

                    Staff staff = new Staff();
                    staff.FirstName = createAccountParams.FirstName;
                    staff.LastName = createAccountParams.LastName;
                    staff.Phone = createAccountParams.Phone;
                    staff.CardIdentity = createAccountParams.CardIdentity;

                     _unitOfWork.AccountsRepository.CreateAccount(account, null, staff);
                    return Ok();
                }
                else
                {
                    if (oldAccount.State == 2)
                    {
                        return BadRequest("This account has been blocked");
                    }
                    else if (oldAccount.State == 0)
                    {
                        oldAccount.State = 1;
                        oldAccount.Password =  _accountsService.MD5Hash(createAccountParams.CardIdentity);
                        oldAccount.VerificationCode = verificationCode;
                    }
                    else
                    {
                        if (createAccountParams.NewEmail != "")
                        {
                            var checkAccount = _unitOfWork.AccountsRepository.IsExistEmailActivate(createAccountParams.NewEmail);
                            if (checkAccount != null)
                            {
                                return BadRequest("Email already exist!");
                            }
                            else
                            {
                                oldAccount.Email = createAccountParams.NewEmail;
                                oldAccount.VerificationCode = verificationCode;
                            }
                        }
                        if (createAccountParams.NewCard != "")
                        {
                            var checkCardAccount = _unitOfWork.AccountsRepository.IsExistCardIdentity(createAccountParams.NewCard);
                            if (checkCardAccount)
                            {
                                return BadRequest("Card Identity already exist!");
                            }
                            else
                            {
                                createAccountParams.CardIdentity = createAccountParams.NewCard;
                            }
                        }
                        if (createAccountParams.NewPhone != "")
                        {
                            var checkPhoneAccount = _unitOfWork.AccountsRepository.IsExistPhone(createAccountParams.NewPhone);
                            if (checkPhoneAccount)
                            {
                                return BadRequest("Phone already exist!");
                            }
                            else
                            {
                                createAccountParams.Phone = createAccountParams.NewPhone;
                            }
                        }
                    }

                    oldAccount.IdTypeAccount = createAccountParams.IdTypeAccount;

                    _unitOfWork.AccountsRepository.UpdateAccount(oldAccount);

                    Staff staff = new Staff();
                    staff.FirstName = createAccountParams.FirstName;
                    staff.LastName = createAccountParams.LastName;
                    staff.Phone = createAccountParams.Phone;
                    staff.CardIdentity = createAccountParams.CardIdentity;
                    staff.IdAccount = oldAccount.Id;
                    _unitOfWork.StaffRepository.UpdateStaff(staff);
                }

                if (_unitOfWork.Save() == false)
                {
                    return BadRequest("Failed.");
                }
                return Ok();
            }
            else return BadRequest(ModelState);
        }

        [HttpPatch("UpdateAccount/{id}", Name = "UpdateAccount")]
        public IActionResult UpdateAccount(Account newAccount)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var account = _unitOfWork.AccountsRepository.GetAccountByID(newAccount.Id);
                    if (account.Email != newAccount.Email)
                    {
                        if (_unitOfWork.AccountsRepository.IsExistEmail(newAccount.Email))
                        {
                            return BadRequest("Email already exist!");
                        }
                        else
                        {
                            Random generator = new Random();
                            int verificationCode = generator.Next(100000, 1000000);
                            account.Email = newAccount.Email;
                            account.VerificationCode = verificationCode;
                        }
                    }
                    _unitOfWork.AccountsRepository.UpdateAccount(account);
                    if (_unitOfWork.Save())
                    {
                        return Ok(account);
                    }
                    else
                    {
                        return BadRequest("Something went wrong!");
                    }
                }
                catch
                {
                    return BadRequest("Something went wrong!");
                }
            }
            return BadRequest("Something went wrong!");
        }

        [HttpPut("DeleteAccount/{id}", Name = "DeleteAccount")]
        public IActionResult DeleteAccount(int id)
        {
            try
            {
                var Account = _unitOfWork.AccountsRepository.GetAccountByID(id);

                if (Account == null)
                    return NotFound();

                Account.State = 0;
                _unitOfWork.AccountsRepository.UpdateAccount(Account);
                _unitOfWork.Save();

                int idStaff = Account.Id;
                var lStaff = _unitOfWork.StaffRepository.GetStaffByID(idStaff);
                if (lStaff !=null)
                {
                    _unitOfWork.StaffRepository.DeleteStaff(lStaff.IdAccount);

                }

                _unitOfWork.Save();

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

    
        [AllowAnonymous]
        [HttpPost("CreateCustomerAccount")]
        public IActionResult CreateCustomerAccount([FromBody] CustomerAccount customerAccountParams)
        {
            if (ModelState.IsValid)
            {
                if (_unitOfWork.AccountsRepository.IsExistEmail(customerAccountParams.Email))
                {
                    return BadRequest("Email already exist!");
                }
                else
                {
                    Random generator = new Random();
                    int verificationCode = generator.Next(100000, 1000000);

                    Account account = new Account();
                    account.Email = customerAccountParams.Email;
                    account.Password = _accountsService.MD5Hash(customerAccountParams.Password);
                    account.IdTypeAccount = 4;
                    account.VerificationCode = verificationCode;

                    Customer customer = new Customer();
                    customer.LastName = customerAccountParams.LastName;
                    customer.FirstName = customerAccountParams.FirstName;


                    _unitOfWork.AccountsRepository.CreateAccount(account, customer, null);
                    if (_unitOfWork.Save() == false)
                    {
                        return BadRequest("Failed.");
                    }
                }
                return Ok();
            }
            else return BadRequest(ModelState);
        }


        [HttpPut("BlockAccount/{id}", Name = "BlockAccount")]
        public IActionResult BlockAccount(int id)
        {
            try
            {
                var account = _unitOfWork.AccountsRepository.GetAccountByID(id);

                if (account == null)
                    return NotFound();

                account.State = 2;
                _unitOfWork.AccountsRepository.UpdateAccount(account);

                var checkSave = _unitOfWork.Save();
               if (!checkSave)
                {
                    return BadRequest();
                }

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("UnblockAccount/{id}", Name = "UnblockAccount")]
        public IActionResult UnBlockAccount(int id)
        {
            try
            {
                var account = _unitOfWork.AccountsRepository.GetAccountByID(id);

                if (account == null)
                    return NotFound();

                account.State = 1;
                _unitOfWork.AccountsRepository.UpdateAccount(account);
                _unitOfWork.Save();

                return Ok(account);
            }
            catch
            {
                return BadRequest();
            }
        }
        
        [AllowAnonymous]
        [HttpGet("GetAccountInfo/{id}")]
        public IActionResult GetAccountInfo(int id)
        {
            var account = _unitOfWork.AccountsRepository.GetAccountByID(id);
            if (account.IdTypeAccount == 4)
            {
                var customer = _unitOfWork.CustomersRepository.GetCustomerByID(id);
                return Ok(customer);
            }
            else
            {
                var staff = _unitOfWork.StaffRepository.GetStaffByID(id);
                return Ok(staff);
            }
        }

        [HttpPost("AddImageAccount")]
        public async Task<IActionResult> AddImageAccount(IFormFile file)
        {
            var userId = User.FindFirst("id").Value;
            if (userId == null) return BadRequest();

            var idTypeAccount = User.FindFirst("idTypeAccount").Value;

            if (int.Parse(idTypeAccount) == 4)
            {
                var user = _unitOfWork.CustomersRepository.GetCustomerByID(int.Parse(userId));

                var result = await _imageService.AddImageAsync(file);
                if (result.Error != null) return BadRequest(result.Error.Message);

                if (!string.IsNullOrEmpty(user.PublicId))
                {
                    var resultDelete = await _imageService.DeleteImageAsync(user.PublicId);
                    if (resultDelete.Error != null) return BadRequest("Upload Image Failed");
                }

                user.Image = result.SecureUrl.AbsoluteUri;
                user.PublicId = result.PublicId;

                _unitOfWork.CustomersRepository.UpdateCustomer(user);

                if (_unitOfWork.Save())
                    return Ok(user.Image);
            }
            else
            {
                var user = _unitOfWork.StaffRepository.GetStaffByID(int.Parse(userId));

                var result = await _imageService.AddImageAsync(file);
                if (result.Error != null) return BadRequest(result.Error.Message);

                if (!string.IsNullOrEmpty(user.PublicId))
                {
                    var resultDelete = await _imageService.DeleteImageAsync(user.PublicId);
                    if (resultDelete.Error != null) return BadRequest("Upload Image Failed");
                }

                user.Image = result.SecureUrl.AbsoluteUri;
                user.PublicId = result.PublicId;

                _unitOfWork.StaffRepository.UpdateStaff(user);

                if (_unitOfWork.Save())
                    return Ok(user.Image);
            }

            return BadRequest("Something went wrong!");
        }

        [HttpPost("AdminEditImageAccount")]
        public async Task<IActionResult> AdminEditImageAccount(IFormFile file, [FromQuery] int userId)
        {
            var user = _unitOfWork.StaffRepository.GetStaffByID(userId);

            var result = await _imageService.AddImageAsync(file);
            if (result.Error != null) return BadRequest(result.Error.Message);

            if (!string.IsNullOrEmpty(user.PublicId))
            {
                var resultDelete = await _imageService.DeleteImageAsync(user.PublicId);
                if (resultDelete.Error != null) return BadRequest("Upload Image Failed");
            }

            user.Image = result.SecureUrl.AbsoluteUri;
            user.PublicId = result.PublicId;

            _unitOfWork.StaffRepository.UpdateStaff(user);

            if (_unitOfWork.Save())
                return Ok(user.Image);

            return BadRequest("Something went wrong!");
        }

        [HttpPost("ChangePassword")]
        public IActionResult ChangePassword([FromBody] PasswordParams passwordParams)
        {
            var userId = User.FindFirst("id").Value;
            if (userId == null) return BadRequest("Something went wrong!");

            var provider = User.FindFirst("provider").Value;

            var account = _unitOfWork.AccountsRepository.GetAccountByID(int.Parse(userId));


            if (account.Password == null)
            {
                if (provider == "GOOGLE")
                {
                    account.Password = _accountsService.MD5Hash(passwordParams.NewPassword);
                }
            }
            else
            {
                if (account.Password != _accountsService.MD5Hash(passwordParams.OldPassword))
                    return BadRequest("Incorrect Old Password");
                account.Password = _accountsService.MD5Hash(passwordParams.NewPassword);
            }

            _unitOfWork.AccountsRepository.UpdateAccount(account);

            if (_unitOfWork.Save())
                return Ok();
            else return BadRequest("Something went wrong!");
        }

    }
}
