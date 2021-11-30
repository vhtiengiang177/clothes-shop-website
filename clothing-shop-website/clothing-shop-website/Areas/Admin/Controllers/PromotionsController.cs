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
                promotion.CreatedDate = DateTime.Now;
                var result = _unitOfWork.PromotionsRepository.CreatePromotion(promotion);

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
                var promotion = _unitOfWork.PromotionsRepository.GetPromotionByID(id);

                if (promotion == null)
                    return NotFound();

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

    }
}
