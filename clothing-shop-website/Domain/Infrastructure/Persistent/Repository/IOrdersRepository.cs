﻿using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Infrastructure.Persistent.Repository
{
    public interface IOrdersRepository
    {
        Task<IQueryable<Order>> GetAllOrders();
        Task<IQueryable<Order>> GetAllOrdersByCustomer(int customerID);
        IQueryable<Order> GetOrdersByStates(int[] states);
        Order GetOrderByID(int orderID);
        Order CreateOrder(Order Order);
        void UpdateOrder(Order Order);
        void DeleteOrder(Order Order);
        Task<IQueryable<Order>> GetAllOrdersByCustomerAndState(int customerID, int state);
    }
}