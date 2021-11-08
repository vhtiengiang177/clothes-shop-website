using clothing_shop_website.Model;
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
    public class ProductsController : ControllerBase
    {
        private UnitOfWork _unitOfWork;

        public ProductsController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts([FromQuery] FilterParamsProduct filterParams)
        {
            int currentPageIndex = filterParams.PageIndex ?? 1;
            int currentPageSize = filterParams.PageSize ?? 5;

            IQueryable<Product> lProductItems;

            lProductItems = await _unitOfWork.ProductsRepository.GetAllProducts();

            // lProductItems = _unitOfWork.ProductsRepository.FilterProduct(filterParams, lProductItems);

            var lProduct = _unitOfWork.ProductsRepository.SortListProducts(filterParams.Sort, lProductItems);

            var response = new ResponseJSON<Product> {
                TotalData = lProduct.Count(),
                Data = lProduct.Skip((currentPageIndex - 1) * currentPageSize).Take(currentPageSize).ToList()
            };

            return Ok(response);
        }

        [HttpGet("{id}")]
        public IActionResult GetProductByID(int id)
        {
            var product = _unitOfWork.ProductsRepository.GetProductByID(id);

            if (product == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(product);
            }
        }

        [HttpPost]
        public IActionResult CreateProduct(Product product )
        {
            if (ModelState.IsValid)
            {
                var result = _unitOfWork.ProductsRepository.CreateProduct(product);

                if (_unitOfWork.Save())
                {

                    return Ok(result);
                }
                else
                {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(Product productObj)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _unitOfWork.ProductsRepository.UpdateProduct(productObj);
                    if (!_unitOfWork.Save())
                    {
                        return BadRequest();
                    }

                    return Ok(productObj);
                }
                catch
                {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var product = _unitOfWork.ProductsRepository.GetProductByID(id);

                if (product == null)
                    return NotFound();

                _unitOfWork.ProductsRepository.DeleteProduct(product);
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
