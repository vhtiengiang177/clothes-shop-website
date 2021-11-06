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
    }
}
