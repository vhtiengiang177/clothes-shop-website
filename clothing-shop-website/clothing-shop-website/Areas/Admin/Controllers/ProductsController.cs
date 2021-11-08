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
        public IActionResult CreateProduct([FromBody] Product product, [FromQuery] int[] idColors, [FromQuery] int[] idMaterials, [FromQuery] int[] idSizes )
        {
            if (ModelState.IsValid)
            {
                var result = _unitOfWork.ProductsRepository.CreateProduct(product);

                if (_unitOfWork.Save())
                {

                    Product_Color pcObj = new Product_Color();
                    pcObj.IdProduct = result.Id;
                    int[] distinctIdColors = idColors.Distinct().ToArray();
                    for (int i = 0; i < distinctIdColors.Count(); i++)
                    {
                        pcObj.IdColor = distinctIdColors[i];
                        _unitOfWork.ProductColorsRepository.Insert(pcObj);
                        if (!_unitOfWork.Save())
                        {
                            break;
                        }
                    }

                    Product_Size psObj = new Product_Size();
                    pcObj.IdProduct = result.Id;
                    int[] distinctIdSizes = idSizes.Distinct().ToArray();
                    for (int i = 0; i < distinctIdSizes.Count(); i++)
                    {
                        psObj.IdSize = distinctIdSizes[i];
                        _unitOfWork.ProductSizesRepository.Insert(psObj);
                        if (!_unitOfWork.Save())
                        {
                            break;
                        }
                    }

                    Product_Material pmObj = new Product_Material();
                    pcObj.IdProduct = result.Id;
                    int[] distinctIdMaterials = idMaterials.Distinct().ToArray();
                    for (int i = 0; i < distinctIdMaterials.Count(); i++)
                    {
                        pmObj.IdMaterial = distinctIdMaterials[i];
                        _unitOfWork.ProductMaterialsRepository.Insert(pmObj);
                        if (!_unitOfWork.Save())
                        {
                            break;
                        }
                    }

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
        public IActionResult UpdateProduct([FromBody] Product productObj, [FromQuery] int[] idColors, [FromQuery] int[] idMaterials, [FromQuery] int[] idSizes)
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


                    var lPC = _unitOfWork.ProductsRepository.GetProductColorByIdProduct(productObj.Id);

                    foreach (var item in lPC)
                    {
                        _unitOfWork.ProductColorsRepository.Delete(item);
                    }
                    Product_Color pcObj = new Product_Color();
                    pcObj.IdProduct = productObj.Id;
                    int[] distinctIdColors = idColors.Distinct().ToArray();
                    for (int i = 0; i < distinctIdColors.Count(); i++)
                    {
                        pcObj.IdColor = distinctIdColors[i];
                        _unitOfWork.ProductColorsRepository.Insert(pcObj);
                        if (!_unitOfWork.Save())
                        {
                            break;
                        }
                    }

                    var lPS = _unitOfWork.ProductsRepository.GetProductSizeByIdProduct(productObj.Id);

                    foreach (var item in lPS)
                    {
                        _unitOfWork.ProductSizesRepository.Delete(item);
                    }
                    Product_Size psObj = new Product_Size();
                    psObj.IdProduct = productObj.Id;
                    int[] distinctIdSizes = idSizes.Distinct().ToArray();
                    for (int i = 0; i < distinctIdSizes.Count(); i++)
                    {
                        pcObj.IdColor = distinctIdSizes[i];
                        _unitOfWork.ProductSizesRepository.Insert(psObj);
                        if (!_unitOfWork.Save())
                        {
                            break;
                        }
                    }

                    var lPM = _unitOfWork.ProductsRepository.GetProductMaterialByIdProduct(productObj.Id);
                    foreach (var item in lPM)
                    {
                        _unitOfWork.ProductMaterialsRepository.Delete(item);
                    }
                    Product_Material pmObj = new Product_Material();
                    pmObj.IdProduct = productObj.Id;
                    int[] distinctIdMaterials = idMaterials.Distinct().ToArray();
                    for (int i = 0; i < distinctIdMaterials.Count(); i++)
                    {
                        pcObj.IdColor = distinctIdMaterials[i];
                        _unitOfWork.ProductMaterialsRepository.Insert(pmObj);
                        if (!_unitOfWork.Save())
                        {
                            break;
                        }
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
