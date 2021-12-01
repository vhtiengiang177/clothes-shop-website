using clothing_shop_website.Model;
using clothing_shop_website.Services;
using Domain.Entity;
using Infrastructure.Persistent;
using Infrastructure.Persistent.UnitOfWork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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
        public AccountsController(DataDbContext dbContext, AccountService accountsService)
        {
            _unitOfWork = new UnitOfWork(dbContext);
            _accountsService = accountsService;
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

        [HttpPost("CreateAccount")]
        public IActionResult CreateAccount([FromBody] CreateAccountParams createAccountParams)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _unitOfWork.AccountsRepository.CreateAccount(createAccountParams.Account, createAccountParams.Customer, createAccountParams.Staff);
                    return Ok();
                }
                catch 
                {
                    return BadRequest(ModelState);
                }
            }
            else return BadRequest(ModelState);
        }

        [HttpPatch("UpdateAccount/{id}", Name = "UpdateAccount")]
        public IActionResult UpdateAccount(Account account)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _unitOfWork.AccountsRepository.UpdateAccount(account);
                    if (_unitOfWork.Save())
                    {
                        return Ok(account);
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                catch
                {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
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

                return Ok(Account);
            }
            catch
            {
                return BadRequest();
            }
        }

    
        [HttpPost("CreateCustomerAccount")]
        public IActionResult CreateCustomerAccount([FromBody] CustomerAccount customerAccountParams)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if(_unitOfWork.AccountsRepository.IsExistEmail(customerAccountParams.Email))
                    {
                        return BadRequest("Email already exist!");
                    }
                    else
                    {
                        Random generator = new Random();
                        int verificationCode = generator.Next(100000, 1000000);

                        Account account = new Account();
                        account.Email = customerAccountParams.Email;
                        account.Password = customerAccountParams.Password;
                        account.IdTypeAccount = 4;
                        account.VerificationCode = verificationCode;

                        Customer customer = new Customer();
                        customer.LastName = customerAccountParams.LastName;
                        customer.FirstName = customerAccountParams.FirstName;


                        _unitOfWork.AccountsRepository.CreateAccount(account, customer, null);
                        _unitOfWork.Save();
                    }
                    return Ok();
                }
                catch
                {
                    return BadRequest(ModelState);
                }
            }
            else return BadRequest(ModelState);
        }


        [HttpPut("BlockAccount/{id}", Name = "BlockAccount")]
        public IActionResult BlockAccount(int id)
        {
            try
            {
                var Account = _unitOfWork.AccountsRepository.GetAccountByID(id);

                if (Account == null)
                    return NotFound();

                Account.State = 2;
                _unitOfWork.AccountsRepository.UpdateAccount(Account);
                _unitOfWork.Save();

                return Ok(Account);
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
                var Account = _unitOfWork.AccountsRepository.GetAccountByID(id);

                if (Account == null)
                    return NotFound();

                Account.State = 1;
                _unitOfWork.AccountsRepository.UpdateAccount(Account);
                _unitOfWork.Save();

                return Ok(Account);
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
