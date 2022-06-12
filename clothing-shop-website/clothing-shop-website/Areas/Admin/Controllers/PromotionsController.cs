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
using System.Threading.Tasks;

namespace clothing_shop_website.Areas.Admin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PromotionsController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        private PromotionsService _promotionsService;

        public PromotionsController(DataDbContext dbContext, PromotionsService promotionsService)
        {
            _unitOfWork = new UnitOfWork(dbContext);
            _promotionsService = promotionsService;
        }

        [HttpGet("GetAllPromotions")]
        public async Task<IActionResult> GetAllPromotions([FromQuery] FilterParamsPromotion filterParams)
        {
            try
            {
                int currentPageIndex = filterParams.PageIndex ?? 1;
                int currentPageSize = filterParams.PageSize ?? 5;

                IQueryable<Promotion> lPromotionItems;

                lPromotionItems = await _unitOfWork.PromotionsRepository.GetAllPromotions();

                lPromotionItems = _promotionsService.FilterPromotion(filterParams, lPromotionItems);

                var lPromotion = _promotionsService.SortListPromotion(filterParams.Sort, lPromotionItems);

                var response = new ResponseJSON<Promotion>
                {
                    TotalData = lPromotion.Count(),
                    Data = lPromotion.Skip((currentPageIndex - 1) * currentPageSize).Take(currentPageSize).ToList()
                };

                return Ok(response);
            }
            catch
            {
                return BadRequest();
            }

        }

        [AllowAnonymous]
        [HttpGet("GetPromotionsEffective")]
        public async Task<IActionResult> GetPromotionsEffective()
        {
            try
            {
               
                IQueryable<Promotion> lPromotionItems;

                lPromotionItems = await _unitOfWork.PromotionsRepository.GetPromotionsEffective();

                var response = new ResponseJSON<Promotion>
                {
                    TotalData = lPromotionItems.Count(),
                    Data = lPromotionItems.ToList()
                };

                return Ok(response);
            }
            catch
            {
                return BadRequest();
            }

        }

        [HttpGet("GetPromotionByID/{id}", Name = "GetPromotionByID")]
        public IActionResult GetPromotionByID(int id)
        {
            var promotion = _unitOfWork.PromotionsRepository.GetPromotionByID(id);

            if (promotion == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(promotion);
            }
        }

        [AllowAnonymous]
        [HttpGet("{Code}")]
        public IActionResult GetlPromotionByID(string Code)
        {
            Code = Code.ToUpper();
            var Promotion = _unitOfWork.PromotionsRepository.GetPromotionByName(Code);

            if (Promotion == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(Promotion);
            }
        }

        [HttpPost("CreatePromotion")]
        public IActionResult CreatePromotion(Promotion promotion)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                promotion.CreatedById = int.Parse(userId);
                promotion.CreatedDate = DateTime.Now;

                var oldPromotion = _unitOfWork.PromotionsRepository.GetPromotionInactiveByCode(promotion.Name);

                Promotion result = new Promotion();

                if (oldPromotion != null)
                {
                    oldPromotion.Name = promotion.Name;
                    oldPromotion.Description = promotion.Description;
                    oldPromotion.Value = promotion.Value;
                    oldPromotion.State = 1;
                    oldPromotion.StartDate = promotion.StartDate;
                    oldPromotion.EndDate = promotion.EndDate;
                    oldPromotion.CreatedById = promotion.CreatedById;
                    oldPromotion.CreatedDate = promotion.CreatedDate;
                    oldPromotion.LastModified = null;
                    oldPromotion.ModifiedById = null;

                    _unitOfWork.PromotionsRepository.UpdatePromotion(oldPromotion);
                    result = oldPromotion;
                }
                else
                {
                    result = _unitOfWork.PromotionsRepository.CreatePromotion(promotion);
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

        [HttpPut("UpdatePromotion/{id}", Name = "UpdatePromotion")]
        public IActionResult UpdatePromotion(Promotion promotion)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var userId = User.FindFirst("id").Value;
                    if (userId == null) return BadRequest();

                    promotion.ModifiedById = int.Parse(userId);
                    promotion.LastModified = DateTime.Now;

                    _unitOfWork.PromotionsRepository.UpdatePromotion(promotion);
                    if (_unitOfWork.Save())
                    {
                        return Ok(promotion);
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                catch
                {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPut("DeletePromotion/{id}", Name = "DeletePromotion")]
        public IActionResult DeletePromotion(int id)
        {
            try
            {
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                var promotion = _unitOfWork.PromotionsRepository.GetPromotionByID(id);

                if (promotion == null)
                    return NotFound();

                promotion.ModifiedById = int.Parse(userId);
                promotion.LastModified = DateTime.Now;
                promotion.State = 0;
                _unitOfWork.PromotionsRepository.UpdatePromotion(promotion);
                _unitOfWork.Save();

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPut("ApplyPromotionForProduct/{idPromotion}&&{idProduct}")]
        public IActionResult ApplyPromotionForProduct(int idPromotion, int idProduct)
        {
            if (ModelState.IsValid)
            {
                //var userId = User.FindFirst("id").Value;
                //if (userId == null) return BadRequest();

                Product product = _unitOfWork.ProductsRepository.GetProductByID(idProduct);
                Promotion promotion = _unitOfWork.PromotionsRepository.GetPromotionByID(idPromotion);
                //product.ModifiedById = int.Parse(userId);
                product.LastModified = DateTime.Now;
                product.idPromotion = idPromotion;
                product.PricePromotion = product.UnitPrice * (1 - promotion.Value);
                _unitOfWork.ProductsRepository.UpdateProduct(product);
                _unitOfWork.Save();

                return Ok();
            }
            return BadRequest(ModelState);
        }

        [AllowAnonymous]
        [HttpPut("DeletePromotionForProduct/{idProduct}")]
        public IActionResult DeletePromotionForProduct(int idProduct)
        {
            if (ModelState.IsValid)
            {
                //var userId = User.FindFirst("id").Value;
                //if (userId == null) return BadRequest();

                Product product = _unitOfWork.ProductsRepository.GetProductByID(idProduct);
                //product.ModifiedById = int.Parse(userId);
                product.LastModified = DateTime.Now;
                product.idPromotion = default(int?);
                product.PricePromotion = product.UnitPrice;
                _unitOfWork.ProductsRepository.UpdateProduct(product);
                _unitOfWork.Save();

                return Ok();
            }
            return BadRequest(ModelState);
        }

        [AllowAnonymous]
        [HttpPut("ApplyPromotionForAllProduct")]
        public IActionResult ApplyPromotionForAllProduct([FromQuery] int[] idCatcegories,int idPromotion)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                List<Product> lProduct = new List<Product>();
                lProduct = _unitOfWork.ProductsRepository.GetProductsByCategoriesID(idCatcegories).ToList();
                
                foreach(Product product in lProduct)
                {
                    product.ModifiedById = int.Parse(userId);
                    product.LastModified = DateTime.Now;
                    product.idPromotion = idPromotion;
                    _unitOfWork.ProductsRepository.UpdateProduct(product);
                    _unitOfWork.Save();
                }

                return Ok();
            }
            return BadRequest(ModelState);
        }

        [AllowAnonymous]
        [HttpPut("DeletePromotionForAllProduct")]
        public IActionResult DeletePromotionForAllProduct([FromQuery] int[] idCatcegories)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                List<Product> lProduct = new List<Product>();
                lProduct = _unitOfWork.ProductsRepository.GetProductsByCategoriesID(idCatcegories).ToList();

                foreach (Product product in lProduct)
                {
                    product.ModifiedById = int.Parse(userId);
                    product.LastModified = DateTime.Now;
                    product.idPromotion = null;
                    _unitOfWork.ProductsRepository.UpdateProduct(product);
                    _unitOfWork.Save();
                }

                return Ok();
            }
            return BadRequest(ModelState);
        }

    }
}
