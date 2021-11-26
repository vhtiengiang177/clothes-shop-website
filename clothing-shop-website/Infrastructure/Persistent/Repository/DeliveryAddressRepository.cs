using Domain.Entity;
using Domain.Infrastructure.Persistent.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Infrastructure.Persistent.Repository
{
    public class DeliveryAddressRepository:IDeliveryAddressRepository
    {
        private DataDbContext _dbContext;

        public DeliveryAddressRepository(DataDbContext dataDbContext)
        {
            _dbContext = dataDbContext;
        }

        public async Task<IQueryable<DeliveryAddress>> GetAllDeliveryAddresssByCustomer(int customerID)
        {
            var lDeliveryAddress = await _dbContext.DeliveryAddresses.Where(p => p.State > 0 && p.IdCustomer == customerID).ToListAsync();

            return lDeliveryAddress.AsQueryable();
        }

        public DeliveryAddress GetDeliveryAddressByID(int deliveryAddressID)
        {
            return _dbContext.DeliveryAddresses.FirstOrDefault(p => p.Id == deliveryAddressID && p.State > 0);
        }
        public DeliveryAddress CreateDeliveryAddress(DeliveryAddress DeliveryAddress)
        {
            
            var result = _dbContext.DeliveryAddresses.Add(DeliveryAddress);

            return result.Entity;
        }
        public void UpdateDeliveryAddress(DeliveryAddress DeliveryAddress)
        {
            _dbContext.Attach(DeliveryAddress);
            _dbContext.Entry(DeliveryAddress).State = EntityState.Modified;
        }

    }
}
