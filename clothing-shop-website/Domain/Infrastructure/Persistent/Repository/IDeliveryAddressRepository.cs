using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Infrastructure.Persistent.Repository
{
    public interface IDeliveryAddressRepository
    {
        Task<IQueryable<DeliveryAddress>> GetAllDeliveryAddresssByCustomer(int customerID);
        DeliveryAddress GetDeliveryAddressByID(int deliveryAddressID);
        DeliveryAddress CreateDeliveryAddress(DeliveryAddress DeliveryAddress);
        void UpdateDeliveryAddress(DeliveryAddress DeliveryAddress);
    }
}
