using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Infrastructure.Persistent.Repository
{
    public interface IReviewsRepository
    {
        Task<IQueryable<Review>> GetReviewsByIdProduct(int productID);
        Review CreateReview(Review review);
        Task<IQueryable<Review>> GetReviews();
        int GetCountReview(int idProduct);
        int GetAvgRating(int idProduct);
    }
}
