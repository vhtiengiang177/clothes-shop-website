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
    public class StylesController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public StylesController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet]
        public IActionResult GetAllStyles()
        {
            var lStyles = _unitOfWork.StylesRepository.Get();

            return Ok(lStyles);
        }


        [HttpGet("{id}")]
        public IActionResult GetlStyleByID(int id)
        {
            var style = _unitOfWork.StylesRepository.GetByID(id);

            if (style == null) {
                return NotFound();
            }
            else {
                return Ok(style);
            }
        }

        [HttpPost]
        public IActionResult CreateStyle(Style style)
        {
            if (ModelState.IsValid) {
                _unitOfWork.StylesRepository.Insert(style);

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
        public IActionResult UpdateStyle(Style style)
        {
            if (ModelState.IsValid) {
                try {
                    _unitOfWork.StylesRepository.Update(style);
                    if (_unitOfWork.Save()) {
                        return Ok(style);
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
        public IActionResult DeleteStyle(int id)
        {
            try {
                var style = _unitOfWork.StylesRepository.GetByID(id);

                if (style == null)
                    return NotFound();

                _unitOfWork.StylesRepository.Delete(style);
                _unitOfWork.Save();

                return Ok();
            }
            catch {
                return BadRequest();
            }
        }
    }
}
