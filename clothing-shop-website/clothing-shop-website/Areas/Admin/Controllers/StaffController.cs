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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        private StaffService _staffService;
        private AccountService _accountService;


        public StaffController(DataDbContext dbContext, StaffService staffService, AccountService accountService)
        {
            _unitOfWork = new UnitOfWork(dbContext);
            _staffService = staffService;
            _accountService = accountService;
        }

        [HttpGet]
        public IActionResult GetAllStaff()
        {
            try 
            { 
                IQueryable<Staff> lStaffItems;

                lStaffItems = _unitOfWork.StaffRepository.GetAllStaff();


                return Ok(lStaffItems);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("GetAllAccountStaff")]
        public IActionResult GetAllAccountStaff([FromQuery] FilterParamsAccount filterParams)
        {
            try
            {
                int currentPageIndex = filterParams.PageIndex ?? 1;
                int currentPageSize = filterParams.PageSize ?? 5;

                IQueryable<Account> lStaffItems;

                //if (filterParams.IdTypeCustomers != null)
                //{
                //    if (filterParams.IdTypeCustomers.Count() != 0
                //        || filterParams.IdTypeCustomers.Count() != 3)
                //    {
                //        lCustomerItems = _unitOfWork.CustomersRepository.GetlCustomersByTypeCustomerID(filterParams.IdTypeCustomers);
                //    }
                //    else lCustomerItems =  _unitOfWork.CustomersRepository.GetAllAccountCustomers();
                //}
                //else lCustomerItems =  _unitOfWork.CustomersRepository.GetAllAccountCustomers();

                lStaffItems = _unitOfWork.StaffRepository.GetAllAccountStaff();

                lStaffItems = _accountService.FilterAccount(filterParams, lStaffItems);

                var lStaff = _accountService.SortListAccount(filterParams.Sort, lStaffItems);

                var response = new ResponseJSON<Account>
                {
                    TotalData = lStaff.Count(),
                    Data = lStaff.Skip((currentPageIndex - 1) * currentPageSize).Take(currentPageSize).ToList()
                };

                return Ok(response);
            }
            catch
            {
                return BadRequest();
            }
        }


        [AllowAnonymous]
        [HttpGet("GetStaffByID/{id}")]
        public IActionResult GetStaffByID(int id)
        {
            var staff = _unitOfWork.StaffRepository.GetStaffByID(id);

            if (staff == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(staff);
            }
        }

        [HttpPost]
        public IActionResult CreateStaff(Staff staff)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.StaffRepository.CreateStaff(staff);

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

        [HttpPut("UpdateStaff/{id}", Name = "UpdateStaff")]
        public IActionResult UpdateStaff(Staff staff)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _unitOfWork.StaffRepository.UpdateStaff(staff);
                    if (_unitOfWork.Save())
                    {
                        return Ok(staff);
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

        [HttpPut("DeleteStaff/{id}", Name = "DeleteStaff")]
        public IActionResult DeleteStaff(int id)
        {
            try
            {
                var Staff = _unitOfWork.StaffRepository.GetStaffByID(id);

                if (Staff == null)
                    return NotFound();

                _unitOfWork.StaffRepository.DeleteStaff(id);
                _unitOfWork.Save();

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

       
    }
}
