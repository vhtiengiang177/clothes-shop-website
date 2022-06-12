using Domain.Entity;
using Domain.Infrastructure.Persistent.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistent.Repository
{
    public class FavoritesRepository: IFavoritesRepository
    {
        private DataDbContext _dbContext;

        public FavoritesRepository(DataDbContext dataDbContext)
        {
            _dbContext = dataDbContext;
        }

        public async Task<IQueryable<Favorite>> GetAllItemsInFavorite(int accountID)
        {
            var lProduct = await _dbContext.Favorites.Where(p => p.IdAccount == accountID).ToListAsync();

            return lProduct.AsQueryable();
        }

        
        public Favorite GetItemInFavorite(int accountID, int productID)
        {
            return _dbContext.Favorites.FirstOrDefault(p => p.IdAccount == accountID && p.IdProduct == productID);
        }

        public Favorite AddItemToFavorites(Favorite favorite)
        {
            try
            {
                var result = _dbContext.Favorites.Add(favorite);
                _dbContext.SaveChanges();
                return result.Entity;
            }
            catch
            {
                throw;
            }
        }

        public void DeleteItemInFavorite(Favorite favorite)
        {
            if (_dbContext.Entry(favorite).State == EntityState.Detached)
            {
                _dbContext.Attach(favorite);
            }
            _dbContext.Remove(favorite);
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

