﻿using Domain.Entity;
using Domain.Infrastructure.Persistent.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistent.Repository
{
    public class OrdersRepository:IOrdersRepository
    {
        private DataDbContext _dbContext;

        public OrdersRepository(DataDbContext dataDbContext)
        {
            _dbContext = dataDbContext;
        }
        public async Task<IQueryable<Order>> GetAllOrders()
        {
            var lOrder = await _dbContext.Orders.Where(p => p.State > 0).ToListAsync();

            return lOrder.AsQueryable();
        }
        public async Task<IQueryable<Order>> GetAllOrdersByCustomer(int customerID)
        {
            var lOrder = await _dbContext.Orders.Where(p => p.IdCustomer == customerID).ToListAsync();

            return lOrder.AsQueryable();
        }

        public async Task<IQueryable<Order>> GetAllOrdersByCustomerAndState(int customerID,int state)
        {
            var lOrder = await _dbContext.Orders.Where(p => p.State == state && p.IdCustomer == customerID).ToListAsync();

            return lOrder.AsQueryable();
        }

        public IQueryable<Order> GetOrdersByStates(int[] states)
        {
            int[] distinctStates = states.Distinct().ToArray();

            var lOrderItem = _dbContext.Orders
                                    .Where(p => distinctStates.Contains((int)p.State)).ToList();

            return lOrderItem.AsQueryable();
        }

        public Order GetOrderByID(int orderID)
        {
            return _dbContext.Orders.FirstOrDefault(p => p.Id == orderID && p.State > 0);
        }
        public Order CreateOrder(Order Order)
        {
            Order.DateOrder = System.DateTime.Now;
            var result = _dbContext.Orders.Add(Order);

            return result.Entity;
        }
        public void UpdateOrder(Order Order)
        {
            _dbContext.Attach(Order);
            _dbContext.Entry(Order).State = EntityState.Modified;
        }
        public void DeleteOrder(Order Order)
        {
            if (_dbContext.Entry(Order).State == EntityState.Detached)
            {
                _dbContext.Attach(Order);
            }
            _dbContext.Remove(Order);
        }
    }
}