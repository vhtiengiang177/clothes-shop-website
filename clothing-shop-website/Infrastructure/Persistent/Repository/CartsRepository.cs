using Domain.Entity;
using Domain.Infrastructure.Persistent.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistent.Repository
{
    public class CartsRepository: ICartsRepository
    {
        private DataDbContext _dbContext;

        public CartsRepository(DataDbContext dataDbContext)
        {
            _dbContext = dataDbContext;
        }

        public async Task<IQueryable<Cart>> GetAllItemsInCart(int customerID)
        {
            var lProductCart = await _dbContext.Carts.Where(p => p.IdCustomer == customerID).ToListAsync();

            return lProductCart.AsQueryable();
        }

        public Cart GetItemInCart(int customerID, int productID, int sizeID, int colorID)
        {
            return _dbContext.Carts.FirstOrDefault(p => p.IdCustomer == customerID && p.IdProduct == productID && p.IdSize == sizeID && p.IdColor == colorID);
        }

        public Cart AddItemToCart(Cart cart)
        {
            try
            {
                var result = _dbContext.Carts.Add(cart);
                _dbContext.SaveChanges();
                return result.Entity;
            }
            catch
            {
                throw;
            }
        }

        public void UpdateCart(Cart cart)
        {
            _dbContext.Attach(cart);
            _dbContext.Entry(cart).State = EntityState.Modified;
        }

        public void DeleteItemInCart(Cart cart)
        {
            if (_dbContext.Entry(cart).State == EntityState.Detached)
            {
                _dbContext.Attach(cart);
            }
            _dbContext.Remove(cart);
        }

    }
}
