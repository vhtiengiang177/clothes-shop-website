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
    public class ColorsController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public ColorsController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet]
        public IActionResult GetAllColors()
        {
            var lColor = _unitOfWork.ColorsRepository.Get();

            return Ok(lColor);
        }


        [HttpGet("{id}")]
        public IActionResult GetColorByID(int id)
        {
            var color = _unitOfWork.ColorsRepository.GetByID(id);

            if (color == null) {
                return NotFound();
            }
            else {
                return Ok(color);
            }
        }

        [HttpPost]
        public IActionResult CreateColor(Color color)
        {
            if (ModelState.IsValid) {
               
                _unitOfWork.ColorsRepository.Insert(color);

                if (_unitOfWork.Save()) {
                        return Ok();
                }
                else {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPut("UpdateColor/{id}", Name = "UpdateColor")]
        public IActionResult UpdateColor(Color color)
        {
            if (ModelState.IsValid) {
                try {
                    _unitOfWork.ColorsRepository.Update(color);
                    if (_unitOfWork.Save()) {
                        return Ok(color);
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

        [HttpPut("DeleteColor/{id}", Name = "DeleteColor")]
        public IActionResult DeleteColor(int id)
        {
            try {
                var color = _unitOfWork.ColorsRepository.GetByID(id);

                if (color == null)
                    return NotFound();
                color.State = 0;
                _unitOfWork.ColorsRepository.Update(color);
                _unitOfWork.Save();

                return Ok();
            }
            catch {
                return BadRequest();
            }
        }
    }
}
