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

namespace clothing_shop_website.Areas.Admin.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        private CustomersService _customersService;
        private AccountService _accountService;

        public CustomersController(DataDbContext dbContext, CustomersService customersService, AccountService accountService )
        {
            _unitOfWork = new UnitOfWork(dbContext);
            _customersService = customersService;
            _accountService = accountService;
        }

        [HttpGet("GetAllAccountCustomers")]
        public IActionResult GetAllAccountCustomers([FromQuery] FilterParamsAccount filterParams)
        {
            try
            {
                int currentPageIndex = filterParams.PageIndex ?? 1;
                int currentPageSize = filterParams.PageSize ?? 5;

                IQueryable<Account> lCustomerItems;

                lCustomerItems = _unitOfWork.CustomersRepository.GetAllAccountCustomers();

                lCustomerItems = _accountService.FilterAccount(filterParams, lCustomerItems);

                var lCustomer = _accountService.SortListAccount(filterParams.Sort, lCustomerItems);

                var response = new ResponseJSON<Account>
                {
                    TotalData = lCustomer.Count(),
                    Data = lCustomer.Skip((currentPageIndex - 1) * currentPageSize).Take(currentPageSize).ToList()
                };

                return Ok(response);
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpGet("GetAllCustomers")]
        public IActionResult GetAllCustomers([FromQuery] FilterParamsCustomer filterParams)
        {
            try
            {
                int currentPageIndex = filterParams.PageIndex ?? 1;
                int currentPageSize = filterParams.PageSize ?? 5;

                IQueryable<Customer> lCustomerItems;

                lCustomerItems = _unitOfWork.CustomersRepository.GetAllCustomers();

                lCustomerItems = _customersService.FilterCustomer(filterParams, lCustomerItems);

                var lCustomer = _customersService.SortListCustomer(filterParams.Sort, lCustomerItems);

                var response = new ResponseJSON<Customer>
                {
                    TotalData = lCustomer.Count(),
                    Data = lCustomer.Skip((currentPageIndex - 1) * currentPageSize).Take(currentPageSize).ToList()
                };

                return Ok(response);
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpGet("GetlCustomerByID/{id}", Name = "GetlCustomerByID")]
        public IActionResult GetlCustomerByID(int id)
        {
            var Customer = _unitOfWork.CustomersRepository.GetCustomerByID(id);

            if (Customer == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(Customer);
            }
        }

        [HttpGet("GetAllCustomersByIDType/{id}", Name = "GetAllCustomersByIDType")]
        public IActionResult GetAllCustomersByIDType(int id)
        {
            var Customer = _unitOfWork.CustomersRepository.GetAllCustomersByIDType(id);

            if (Customer == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(Customer);
            }
        }

        [HttpPut("UpdateCustomer/{id}", Name = "UpdateCustomer")]
        public IActionResult UpdateCustomer(Customer customer)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _unitOfWork.CustomersRepository.UpdateCustomer(customer);
                    if (_unitOfWork.Save())
                    {
                        return Ok(customer);
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

        [HttpPut("DeleteCustomer/{id}", Name = "DeleteCustomer")]
        public IActionResult DeleteCustomer(int id)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _unitOfWork.CustomersRepository.DeleteCustomer(id);
                    if (_unitOfWork.Save())
                    {
                        return Ok();
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
