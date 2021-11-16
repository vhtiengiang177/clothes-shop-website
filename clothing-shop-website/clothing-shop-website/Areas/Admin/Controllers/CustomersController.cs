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
    public class CustomersController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public CustomersController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet]
        public IActionResult GetAllCustomer()
        {
            var lCustomers = _unitOfWork.CustomersRepository.Get();

            return Ok(lCustomers);
        }


        [HttpGet("{id}")]
        public IActionResult GetlCustomerByID(int id)
        {
            var Customer = _unitOfWork.CustomersRepository.GetByID(id);

            if (Customer == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(Customer);
            }
        }

        [HttpPost]
        public IActionResult CreateCustomer(Customer customer)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.CustomersRepository.Create(customer);

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

        [HttpPut("UpdateCustomer/{id}", Name = "UpdateCustomer")]
        public IActionResult UpdateCustomer(Customer customer)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _unitOfWork.CustomersRepository.Update(customer);
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

       
    }

    
}
