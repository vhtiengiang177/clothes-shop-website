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
    public class CategoriesController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public CategoriesController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet]
        public IActionResult GetAllCategories()
        {
            var lCategories = _unitOfWork.CategoriesRepository.Get();

            return Ok(lCategories);
        }


        [HttpGet("{id}")]
        public IActionResult GetCategoryByID(int id)
        {
            var category = _unitOfWork.CategoriesRepository.GetByID(id);

            if (category == null) {
                return NotFound();
            }
            else {
                return Ok(category);
            }
        }

        [HttpPost]
        public IActionResult CreateCategory(Category category)
        {
            if (ModelState.IsValid) {
                category.CreatedDate = DateTime.Now;
                 _unitOfWork.CategoriesRepository.Insert(category);

                if (_unitOfWork.Save()) {
                        return Ok();
                }
                else {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPut("UpdateCategory/{id}", Name = "UpdateCategory")]
        public IActionResult UpdateCategory(Category category)
        {
            if (ModelState.IsValid) {
                try {
                    category.LastModified = DateTime.Now;
                    _unitOfWork.CategoriesRepository.Update(category);
                    if (_unitOfWork.Save()) {
                        return Ok(category);
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

        [HttpPut("DeleteCategory/{id}", Name = "DeleteCategory")]
        public IActionResult DeleteCategory(int id)
        {
            try {
                var category = _unitOfWork.CategoriesRepository.GetByID(id);

                if (category == null)
                    return NotFound();

                category.State = 0;
                _unitOfWork.CategoriesRepository.Update(category);
                _unitOfWork.Save();

                return Ok();
            }
            catch {
                return BadRequest();
            }
        }

    }
}
