using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Infrastructure.Persistent.Repository
{
    public interface IOrdersRepository
    {
        Task<IQueryable<Order>> GetAllOrdersByState(int state);
        Task<IQueryable<Order>> GetAllOrdersByCustomer(int customerID);
        IQueryable<Order> GetOrdersByStates(int[] states);
        Order GetOrderByID(int orderID);
        Order CreateOrder(Order Order);
        void UpdateOrder(Order Order);
        void DeleteOrder(Order Order);
        Task<IQueryable<Order>> GetAllOrdersByCustomerAndState(int customerID, int state);
        Task<IQueryable<OrderDetail>> GetAllOrderDetailByOrder(int order);
         Task<IQueryable<Order>> GetAllOrders();
        IQueryable<OrderDetail> GetAllOrderDetailByOrder2(int order);
        IQueryable<Order> GetDataAmount(DateTime fromDate, DateTime toDate);

    }
}
