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
    public class StaffController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public StaffController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet]
        public IActionResult GetAllStaff()
        {
            var lStaff = _unitOfWork.StaffRepository.GetAllStaff();

            return Ok(lStaff);
        }

        [HttpGet("{id}")]
        public IActionResult GetlStaffByID(int id)
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
