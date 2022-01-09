using clothing_shop_website.Interface;
using clothing_shop_website.Model;
using clothing_shop_website.Services;
using Domain.Entity;
using Infrastructure.Persistent;
using Infrastructure.Persistent.UnitOfWork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace clothing_shop_website.Areas.Admin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        private ProductsService _productsService;
        private IImageService _imageService;

        public ProductsController(DataDbContext dbContext, ProductsService productsService, IImageService imageService)
        {
            _unitOfWork = new UnitOfWork(dbContext);
            _productsService = productsService;
            _imageService = imageService;
        }

        [AllowAnonymous]
        [HttpGet("GetAllProducts")]
        public async Task<IActionResult> GetAllProducts([FromQuery] FilterParamsProduct filterParams)
        {
            try
            {
                int currentPageIndex = filterParams.PageIndex ?? 1;
                int currentPageSize = filterParams.PageSize ?? 5;

                IQueryable<Product> lProductItems;

                if (filterParams.IdCategories != null)
                {
                    if (filterParams.IdCategories.Count() != 0
                        && filterParams.IdCategories.Count() != _unitOfWork.CategoriesRepository.Count())
                    {
                        lProductItems = _unitOfWork.ProductsRepository.GetProductsByCategoriesID(filterParams.IdCategories);
                    }
                    else lProductItems = await _unitOfWork.ProductsRepository.GetAllProducts();
                }
                else lProductItems = await _unitOfWork.ProductsRepository.GetAllProducts();

                lProductItems = _productsService.FilterProduct(filterParams, lProductItems);

                var lProduct = _productsService.SortListProducts(filterParams.Sort, lProductItems);

                var response = new ResponseJSON<Product>
                {
                    TotalData = lProduct.Count(),
                    Data = lProduct.Skip((currentPageIndex - 1) * currentPageSize).Take(currentPageSize).ToList()
                };

                return Ok(response);
            }
            catch
            {
                return BadRequest();
            } 
            
        }

        [AllowAnonymous]
        [HttpGet("GetProductsForClientPage")]
        public async Task<IActionResult> GetProductsForClientPage([FromQuery] FilterParamsProduct filterParams)
        {
            try
            {
                int currentPageIndex = filterParams.PageIndex ?? 1;
                int currentPageSize = filterParams.PageSize ?? 5;

                IQueryable<Product> lProductItems;

                if (filterParams.IdCategories != null)
                {
                    if (filterParams.IdCategories.Count() != 0
                        || filterParams.IdCategories.Count() != _unitOfWork.CategoriesRepository.Count())
                    {
                        lProductItems = _unitOfWork.ProductsRepository.GetProductsByCategoriesID(filterParams.IdCategories);
                    }
                    else lProductItems = await _unitOfWork.ProductsRepository.GetAllProducts();
                }
                else lProductItems = await _unitOfWork.ProductsRepository.GetAllProducts();

                // Check product is empty or not. Empty => Remove 
                lProductItems = lProductItems.Where(item => _unitOfWork.ProductsRepository.CheckCountItemOfProduct(item.Id) > 0);

                lProductItems = _productsService.FilterProduct(filterParams, lProductItems);

                var lProduct = _productsService.SortListProducts(filterParams.Sort, lProductItems);

                var response = new ResponseJSON<Product>
                {
                    TotalData = lProduct.Count(),
                    Data = lProduct.Skip((currentPageIndex - 1) * currentPageSize).Take(currentPageSize).ToList()
                };

                return Ok(response);
            }
            catch
            {
                return BadRequest();
            }

        }

        [AllowAnonymous]
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
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                product.CreatedById = int.Parse(userId);
                product.CreatedDate = DateTime.Now;

                var oldProduct = _unitOfWork.ProductsRepository.GetProductInactiveBySKU(product.Sku);

                Product result = new Product();

                if (oldProduct != null)
                {
                    oldProduct.Name = product.Name;
                    oldProduct.TotalBuy = 0;
                    oldProduct.UnitPrice = product.UnitPrice;
                    oldProduct.State = 1;
                    oldProduct.CreatedById = product.CreatedById;
                    oldProduct.CreatedDate = product.CreatedDate;
                    oldProduct.Description = product.Description;
                    oldProduct.IdCategory = product.IdCategory;
                    oldProduct.LastModified = null;
                    oldProduct.ModifiedById = null;
                    _unitOfWork.ProductsRepository.UpdateProduct(oldProduct);
                    result = oldProduct;
                }
                else
                {
                    result = _unitOfWork.ProductsRepository.CreateProduct(product);
                }
                
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

        [HttpPut("UpdateProduct/{id}")]
        public IActionResult UpdateProduct(Product productObj)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var userId = User.FindFirst("id").Value;
                    if (userId == null) return BadRequest();

                    productObj.ModifiedById = int.Parse(userId);
                    productObj.LastModified = DateTime.Now;

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

        [HttpPut("DeleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                var product = _unitOfWork.ProductsRepository.GetProductByID(id);

                if (product == null)
                    return NotFound();

                product.ModifiedById = int.Parse(userId);
                product.LastModified = DateTime.Now;
                product.State = 0;

                var itemPSC = await _unitOfWork.ProductsRepository.GetListItemByIdProduct(product.Id);
                foreach (var item in itemPSC)
                {
                    item.State = 0;
                    _unitOfWork.ProductSizeColorsRepository.Update(item);
                }

                _unitOfWork.ProductsRepository.UpdateProduct(product);
                _unitOfWork.Save();

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        // Product-Size-Color
        [AllowAnonymous]
        [HttpGet("GetAllItemOfProduct/{id}")]
        public async Task<IActionResult> GetAllItemOfProduct(int id)
        {

            IQueryable<Product_Size_Color> lProductItems;

            lProductItems = await _unitOfWork.ProductsRepository.GetListItemByIdProduct(id);

            return Ok(lProductItems);
        }

        [AllowAnonymous]
        [HttpGet("GetItemsOfProductForClientPage/{id}")]
        public async Task<IActionResult> GetItemsOfProductForClientPage(int id)
        {
            IQueryable<Product_Size_Color> lProductItems;

            lProductItems = await _unitOfWork.ProductsRepository.GetListItemByIdProduct(id);

            return Ok(lProductItems);
        }

        [HttpPost("AddItemOfProduct")]
        public IActionResult AddItemOfProduct(Log_Product logproduct)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                logproduct.CreatedById = int.Parse(userId);
                logproduct.CreatedDate = DateTime.Now;
                _unitOfWork.LogProductsRepository.Create(logproduct);

                Product_Size_Color item = new Product_Size_Color();

                item = _unitOfWork.ProductsRepository.GetItemByIdPSC(logproduct.IdProduct, logproduct.IdSize, logproduct.IdColor);

                if (item != null)
                {
                    if (item.State == 1)
                    {
                        item.Stock += logproduct.Quantity;
                    }
                    else if (item.State == 0)
                    {
                        item.State = 1;
                        item.Stock = logproduct.Quantity;
                    }
                    _unitOfWork.ProductSizeColorsRepository.Update(item);
                }
                else
                {
                    item = new Product_Size_Color();
                    item.IdProduct = logproduct.IdProduct;
                    item.IdSize = logproduct.IdSize;
                    item.IdColor = logproduct.IdColor;
                    item.Stock = logproduct.Quantity;
                    item.State = 1;
                    _unitOfWork.ProductSizeColorsRepository.Create(item);
                }

                if (!_unitOfWork.Save())
                {
                    return BadRequest();
                }
                return Ok();
            }
            return BadRequest(ModelState);
        }

        [HttpPut("DeleteItemOfProduct")]
        public IActionResult DeleteItemOfProduct(Product_Size_Color psc)
        {
            var item = _unitOfWork.ProductsRepository.GetItemActiveByIdPSC(psc.IdProduct, psc.IdSize, psc.IdColor);
            if (item != null)
            {
                item.Stock = 0;
                item.State = 0;
                _unitOfWork.ProductSizeColorsRepository.Update(item);

                if (!_unitOfWork.Save())
                {
                    return BadRequest();
                }
                return Ok();
            }
            else return NotFound();
        }

        [HttpGet("GetItemPSC")]
        public IActionResult GetItemPSC([FromQuery] Product_Size_Color psc)
        {
            var item = _unitOfWork.ProductsRepository.GetItemByIdPSC(psc.IdProduct, psc.IdSize, psc.IdColor);
            if (item != null)
            {
                return Ok(item);
            }
            else return NotFound();
        }

        [AllowAnonymous]
        [HttpGet("GetTopProductBestSellers")]
        public IActionResult GetTopProductBestSellers()
        {
            try
            {
                var lProduct = _unitOfWork.ProductsRepository.GetTopProductBestSellers();

                // Check product is empty or not. Empty => Remove 
                lProduct = lProduct.Where(item => _unitOfWork.ProductsRepository.CheckCountItemOfProduct(item.Id) > 0).Take(6);

                if (lProduct.Count() >= 3)
                {
                    return Ok(lProduct);
                }
                else return NotFound();
            }
            catch
            {
                return BadRequest();
            }

        }

        [AllowAnonymous]
        [HttpGet("GetTopNewProducts")]
        public IActionResult GetTopNewProducts()
        {
            try
            {
                var lProduct = _unitOfWork.ProductsRepository.GetTopNewProducts();

                // Check product is empty or not. Empty => Remove 
                lProduct = lProduct.Where(item => _unitOfWork.ProductsRepository.CheckCountItemOfProduct(item.Id) > 0).Take(6);

                if (lProduct.Count() >= 3)
                {
                    return Ok(lProduct);
                }
                else return NotFound();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("AddImageProduct/{id}")]
        public async Task<IActionResult> AddImageProduct(int id, IFormFile file)
        {

            var product = _unitOfWork.ProductsRepository.GetProductByID(id);

            if (product == null) return NotFound();

            var result = await _imageService.AddImageAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var imageObj = new Image
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                IdProduct = product.Id,
                State = 1
            };

            var lImages = _unitOfWork.ProductsRepository.GetImagesByIdProduct(id);

            var image = _unitOfWork.ImagesRepository.Create(imageObj);

            if (_unitOfWork.Save())
                return Ok(image.Url);
            return BadRequest("Something went wrong!");
        }

        [AllowAnonymous]
        [HttpGet("GetImagesByIdProduct/{id}")]
        public IActionResult GetImagesByIdProduct(int id)
        {
            var lImages = _unitOfWork.ProductsRepository.GetImagesByIdProduct(id);

            return Ok(lImages);
        }

        [HttpGet("DeleteImageProduct/{idImage}")]
        public async Task<IActionResult> DeleteImageProduct(int idImage)
        {

            var image = _unitOfWork.ImagesRepository.GetByID(idImage);

            if (image.PublicId != null)
            {
                var result = await _imageService.DeleteImageAsync(image.PublicId);

                if (result.Error != null) return BadRequest(result.Error.Message);
            }
            
            _unitOfWork.ImagesRepository.Delete(image);
            if (_unitOfWork.Save())
            {
                return Ok();
            }
            else return BadRequest("Failed to delete image");
        }
    }
}
