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
        public PromotionsController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet]
        public IActionResult GetAllPromotion()
        {
            var lPromotions = _unitOfWork.PromotionsRepository.Get();

            return Ok(lPromotions.Where(p => p.State != 0));
        }


        [HttpGet("{id}")]
        public IActionResult GetlPromotionByID(int id)
        {
            var Promotion = _unitOfWork.PromotionsRepository.GetByID(id);

            if (Promotion == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(Promotion);
            }
        }

        [HttpPost]
        public IActionResult CreatePromotion(Promotion promotion)
        {
            if (ModelState.IsValid)
            {
                promotion.CreatedDate = DateTime.Now;
                _unitOfWork.PromotionsRepository.Create(promotion);

                if (_unitOfWork.Save())
                {
                    return Ok();
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
                    _unitOfWork.PromotionsRepository.Update(promotion);
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
                var promotion = _unitOfWork.PromotionsRepository.GetByID(id);

                if (promotion == null)
                    return NotFound();

                promotion.State = 0;
                _unitOfWork.PromotionsRepository.Update(promotion);
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
