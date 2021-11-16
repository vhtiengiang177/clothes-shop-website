using Domain.Entity;
using Infrastructure.Persistent;
using Infrastructure.Persistent.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace clothing_shop_website.Areas.Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public AccountsController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet]
        public IActionResult GetAllAccount()
        {
            var lAccounts = _unitOfWork.AccountsRepository.Get();

            return Ok(lAccounts.Where(a => a.State != 0));
        }


        [HttpGet("{id}")]
        public IActionResult GetlAccountByID(int id)
        {
            var account = _unitOfWork.AccountsRepository.GetByID(id);

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
        public IActionResult CreateAccount(Account account)
        {
            if (ModelState.IsValid)
            {
                
                _unitOfWork.AccountsRepository.Create(account);

                if (_unitOfWork.Save())
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPut("UpdateAccount/{id}", Name = "UpdateAccount")]
        public IActionResult UpdateAccount(Account account)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _unitOfWork.AccountsRepository.Update(account);
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
    }
}
