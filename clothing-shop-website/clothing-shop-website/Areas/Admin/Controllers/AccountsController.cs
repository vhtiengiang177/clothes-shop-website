using clothing_shop_website.Model;
using clothing_shop_website.Services;
using Domain.Entity;
using Infrastructure.Persistent;
using Infrastructure.Persistent.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Areas.Admin.Controllers
{
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
                        || filterParams.IdTypeAccount.Count() != _unitOfWork.CategoriesRepository.Count())
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


        [HttpGet("{id}")]
        public IActionResult GetlAccountByID(int id)
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

        [HttpPost]
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

        [HttpPut("UpdateAccount/{id}", Name = "UpdateAccount")]
        public IActionResult UpdateAccount(Account account)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    account.State = 0;
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
    }
}
