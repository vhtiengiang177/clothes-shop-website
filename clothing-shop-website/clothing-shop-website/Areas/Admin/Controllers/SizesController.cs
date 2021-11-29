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
    public class SizesController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public SizesController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet]
        public IActionResult GetAllSize()
        {
            var lSizes = _unitOfWork.SizesRepository.Get();

            return Ok(lSizes.Where(s => s.State != 0));
        }


        [HttpGet("{id}")]
        public IActionResult GetlSizeByID(int id)
        {
            var size = _unitOfWork.SizesRepository.GetByID(id);

            if (size == null) {
                return NotFound();
            }
            else {
                return Ok(size);
            }
        }

        [HttpPost("CreateSize")]
        public IActionResult CreateSize(Size size)
        {
            if (ModelState.IsValid) {
                var result = _unitOfWork.SizesRepository.Create(size);

                if (_unitOfWork.Save()) {
                    return Ok(result);
                }
                else {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPut("UpdateSize/{id}", Name = "UpdateSize")]
        public IActionResult UpdateSize(Size size)
        {
            if (ModelState.IsValid) {
                try {
                    _unitOfWork.SizesRepository.Update(size);
                    if (_unitOfWork.Save()) {
                        return Ok(size);
                    }
                    else {
                        return BadRequest();
                    }
                }
                catch {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPut("DeleteSize/{id}", Name = "DeleteSize")]
        public IActionResult DeleteSize(int id)
        {
            try {
                var size = _unitOfWork.SizesRepository.GetByID(id);

                if (size == null)
                    return NotFound();

                size.State = 0;
                _unitOfWork.SizesRepository.Update(size);
                _unitOfWork.Save();

                return Ok();
            }
            catch {
                return BadRequest();
            }
        }
    }
}
