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


        [HttpGet("GetProductByID/{id}", Name = "GetProductByID")]
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

        [HttpPost("CreateProduct")]
        public IActionResult CreateProduct(Product product)
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

        [HttpPut("UpdateProduct/{id}", Name = "UpdateProduct")]
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

        [HttpPut("DeleteProduct/{id}", Name = "DeleteProduct")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var product = _unitOfWork.ProductsRepository.GetProductByID(id);

                if (product == null)
                    return NotFound();

                product.State = 0;
                _unitOfWork.ProductsRepository.UpdateProduct(product);
                _unitOfWork.Save();

                return Ok(product);
            }
            catch
            {
                return BadRequest();
            }
        }


        // Product-Size-Color
        [HttpGet("GetAllItemOfProduct/{id}", Name = "GetAllItemOfProduct")]
        public async Task<IActionResult> GetAllItemOfProduct(Product product)
        {

            IQueryable<Product_Size_Color> lProductItems;

            lProductItems = await _unitOfWork.ProductsRepository.GetListItemByIdProduct(product.Id);

            return Ok();
        }



        [HttpPost("AddItemOfProduct")]
        public IActionResult AddItemOfProduct(Log_Product logproduct)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.LogProductsRepository.Insert(logproduct);

                Product_Size_Color item = new Product_Size_Color();

                if (_unitOfWork.ProductsRepository.CheckItemInList(logproduct))
                {
                    item = _unitOfWork.ProductsRepository.GetItemByIdPSC(logproduct);
                    if (item != null)
                    {
                        item.Stock += logproduct.Quantity;
                        _unitOfWork.ProductSizeColorsRepository.Update(item);
                        if (_unitOfWork.Save())
                        {
                            return Ok();
                        }
                    }
                    return BadRequest();
                }
                else
                {
                    item.IdProduct = logproduct.IdProduct;
                    item.IdSize = logproduct.IdSize;
                    item.IdColor = logproduct.IdColor;
                    item.Stock = logproduct.Quantity;
                    item.State = 1;
                    _unitOfWork.ProductSizeColorsRepository.Insert(item);
                    return Ok(item);
                }
            }
            return BadRequest(ModelState);
        }
    }
}
