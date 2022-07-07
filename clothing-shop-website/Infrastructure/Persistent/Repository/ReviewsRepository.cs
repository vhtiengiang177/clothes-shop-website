using Domain.Entity;
using Domain.Infrastructure.Persistent.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Infrastructure.Persistent.Repository
{
    public class ReviewsRepository : IReviewsRepository
    {
        private DataDbContext _dbContext;

        public ReviewsRepository(DataDbContext dataDbContext)
        {
            _dbContext = dataDbContext;
        }
        public async Task<IQueryable<Review>> GetReviewsByIdProduct(int productID)
        {
            var lReview = await _dbContext.Reviews.Where(p => p.IdProduct == productID).ToListAsync();

            return lReview.AsQueryable();
        }

        public async Task<IQueryable<Review>> GetReviewsByIdOrder(int orderId)
        {
            var lReview = await _dbContext.Reviews.Where(p => p.IdOrder == orderId).ToListAsync();

            return lReview.AsQueryable();
        }

        public Review CreateReview(Review review)
        {
            var result = _dbContext.Reviews.Add(review);

            return result.Entity;
        }

        public async Task<IQueryable<Review>> GetReviews()
        {
            var lReview = await _dbContext.Reviews.ToListAsync();

            return lReview.AsQueryable();
        }

        public int GetCountReview(int idProduct)
        {
            int count = _dbContext.Reviews.Where(r => r.IdProduct == idProduct).Count();

            return count;
        }

        public int GetAvgRating(int idProduct)
        {
            int avg = 0;
            decimal count = GetCountReview(idProduct);
            decimal sum = _dbContext.Reviews.Where(r => r.IdProduct == idProduct).Select(r => r.Rating).Sum();
            if ( count> 0)
            {
                avg = (int) Math.Round(sum / count);
            }    
            return avg;
        }

        public bool Save()
        {
            try
            {
                _dbContext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
