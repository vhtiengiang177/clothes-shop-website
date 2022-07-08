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


        [HttpPost("AddReview")]
        public IActionResult AddReview(Review review)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                Customer customer = _unitOfWork.CustomersRepository.GetCustomerByID(int.Parse(userId));

                review.IdUser = int.Parse(userId);
                review.Date = DateTime.Now;
                _unitOfWork.ReviewsRepository.CreateReview(review);
                _unitOfWork.Save();

                Product product = _unitOfWork.ProductsRepository.GetProductByID(review.IdProduct);
                product.AvgRating = _unitOfWork.ReviewsRepository.GetAvgRating(review.IdProduct);
                _unitOfWork.Save();

                return Ok();
            }
            return BadRequest(ModelState);
        }

        [AllowAnonymous]
        [HttpGet("GetReviewsByidOrder/{idOrder}")]
        public async Task<IActionResult> GetReviewsByidOrder(int idOrder)

        {
            IQueryable<Review> lReviews;
            lReviews = await _unitOfWork.ReviewsRepository.GetReviewsByIdOrder(idOrder);

            if (lReviews == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(lReviews);
            }
        }

    }
}
