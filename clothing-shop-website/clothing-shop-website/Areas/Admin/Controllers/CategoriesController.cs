using clothing_shop_website.Model;
using clothing_shop_website.Services;
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
        private CategoriesService _categoriesService;
        public CategoriesController(DataDbContext dbContext, CategoriesService categoriesService)
        {
            _unitOfWork = new UnitOfWork(dbContext);
            _categoriesService = categoriesService;
        }


        [HttpGet("GetAllCategories")]
        public async Task<IActionResult> GetAllCategories([FromQuery] FilterParamsCategories filterParams)
        {
            try
            {
                int currentPageIndex = filterParams.PageIndex ?? 1;
                int currentPageSize = filterParams.PageSize ?? 5;

                IQueryable<Category> lCatesgories;

                lCatesgories =  _unitOfWork.CategoriesRepository.Get();

                lCatesgories = lCatesgories.Where(c => c.State == 1);

                lCatesgories = _categoriesService.FilterCategory(filterParams, lCatesgories);

                var lCategory = _categoriesService.SortListCategory(filterParams.Sort, lCatesgories);

                var response = new ResponseJSON<Category>
                {
                    TotalData = lCategory.Count(),
                    Data = lCategory.Skip((currentPageIndex - 1) * currentPageSize).Take(currentPageSize).ToList()
                };

                return Ok(response);
            }
            catch
            {
                return BadRequest();
            }

        }

        [HttpGet("GetCategoryByID/{id}" , Name = "GetCategoryByID")]
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

        [HttpPost("CreateCategory")]
        public IActionResult CreateCategory(Category category)
        {
            if (ModelState.IsValid) {
                category.CreatedDate = DateTime.Now;
                var result = _unitOfWork.CategoriesRepository.Create(category);

                if (_unitOfWork.Save()) {
                    return Ok(result);
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

                int[] idCategories = new int[1];
                idCategories[0] = category.Id;
                var lProduct = _unitOfWork.ProductsRepository.GetProductsByCategoriesID(idCategories);
                foreach (var item in lProduct)
                {
                    item.State = 0;
                    _unitOfWork.ProductsRepository.UpdateProduct(item);
                }

                _unitOfWork.Save();

                return Ok();
            }
            catch {
                return BadRequest();
            }
        }

    }
}
