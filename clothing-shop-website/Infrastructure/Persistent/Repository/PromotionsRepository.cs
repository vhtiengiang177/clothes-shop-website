using Domain.Entity;
using Domain.Infrastructure.Persistent.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistent.Repository
{
    public class PromotionsRepository:IPromotionsRepository
    {
        private DataDbContext _dbContext;

        public PromotionsRepository(DataDbContext dataDbContext)
        {
            _dbContext = dataDbContext;
        }

        public async Task<IQueryable<Promotion>> GetAllPromotions()
        {
            var lPromotion = await _dbContext.Promotions.Where(p => p.State > 0).ToListAsync();

            return lPromotion.AsQueryable();
        }

        public Promotion GetPromotionByID(int promotionID)
        {
            return _dbContext.Promotions.FirstOrDefault(p => p.Id == promotionID && p.State > 0);
        }

        public Promotion GetPromotionByName(string promotionCode)
        {
            return _dbContext.Promotions.FirstOrDefault(p => p.Name == promotionCode && p.State > 0);
        }
        public Promotion CreatePromotion(Promotion promotion)
        {
            promotion.CreatedDate = System.DateTime.Now;
            var result = _dbContext.Promotions.Add(promotion);

            return result.Entity;
        }
        public void UpdatePromotion(Promotion promotion)
        {
            promotion.LastModified = System.DateTime.Now;
            _dbContext.Attach(promotion);
            _dbContext.Entry(promotion).State = EntityState.Modified;
        }

        public async Task<IQueryable<Promotion>> GetPromotionsEffective()
        {
            var lPromotion = await _dbContext.Promotions.Where(p => p.StartDate <= DateTime.Today && p.EndDate >= DateTime.Today && p.State > 0).ToListAsync();
            return  lPromotion.AsQueryable();
        }

    }
}
