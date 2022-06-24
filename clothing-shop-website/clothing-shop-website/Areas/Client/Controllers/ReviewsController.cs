using Domain.Entity;
using Infrastructure.Persistent;
using Infrastructure.Persistent.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Areas.Client.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public ReviewsController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet("getreviewsbyidproduct/{id}", Name = "getreviewsbyidproduct")]
        public async Task<IActionResult> GetReviewsByIdProduct(int id)

        {
            IQueryable<Review> lReviews;
            lReviews = await _unitOfWork.ReviewsRepository.GetReviewsByIdProduct(id);

            if (lReviews == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(lReviews);
            }
        }

        [HttpPost("CreateReview")]
        public async Task<IActionResult> CreateReview([FromBody] List<Review> lRevieParams)
        {
            try
            {
               

                return Ok();

            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
