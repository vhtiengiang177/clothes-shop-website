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

            return Ok(lSizes);
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

        [HttpPost]
        public IActionResult CreateSize(Size size)
        {
            if (ModelState.IsValid) {
                _unitOfWork.SizesRepository.Insert(size);

                if (_unitOfWork.Save()) {
                        return Ok();
                }
                else {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
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

        [HttpDelete("{id}")]
        public IActionResult DeleteSize(int id)
        {
            try {
                var size = _unitOfWork.SizesRepository.GetByID(id);

                if (size == null)
                    return NotFound();

                _unitOfWork.SizesRepository.Delete(size);
                _unitOfWork.Save();

                return Ok();
            }
            catch {
                return BadRequest();
            }
        }
    }
}
