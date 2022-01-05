using Domain.Entity;
using Domain.Infrastructure.Persistent.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
        public async Task<IQueryable<Order>> GetAllOrdersByState(int state)
        {
            var lOrder = await _dbContext.Orders.Where(p => p.State == state).ToListAsync();

            return lOrder.AsQueryable();
        }

        public async Task<IQueryable<Order>> GetAllOrders()
        {
            var lOrder = await _dbContext.Orders.ToListAsync();

            return lOrder.AsQueryable();
        }

        public async Task<IQueryable<OrderDetail>> GetAllOrderDetailByOrder(int order)
        {
            var lOrder = await _dbContext.OrderDetails.Where(p => p.IdOrder == order).ToListAsync();

            return lOrder.AsQueryable();
        }

        public IQueryable<OrderDetail> GetAllOrderDetailByOrder2(int order)
        {
            var lOrder =  _dbContext.OrderDetails.Where(p => p.IdOrder == order).ToList();

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

       public double GetEarningInDay()
        {
            double totalEarning = 0;
            var listOrder = _dbContext.Orders.Where(item => item.State == 5 && item.DateShip != null).ToList();

            foreach (var order in listOrder)
            {
                var dateship = order.DateShip.HasValue ? order.DateShip?.ToShortDateString() : "";
                if (dateship != "" && dateship == DateTime.Now.ToShortDateString())
                {
                    totalEarning += order.TotalAmount;
                }
            }

            return totalEarning;
        }

        public int GetTotalBuyProductsInDay()
        {
            int totalBuy = 0;
            var listOrder = _dbContext.Orders.Where(item => item.State == 5 && item.DateShip == DateTime.Now).ToList();

            foreach (var order in listOrder)
            {
                totalBuy += order.TotalQuantity;
            }

            return totalBuy;
        }

        public int GetProcessOrder()
        {
            int task = 0;
            var listOrder = _dbContext.Orders.Where(item => item.State == 1).ToList();

            task = listOrder.Count();

            return task;
        }

        public int GetTotalBuyProductsInMonth()
        {
            int totalBuy = 0;
            var listOrderHasDateShip = _dbContext.Orders.Where(item => item.DateShip.HasValue).ToList();
            var listOrder = listOrderHasDateShip.Where(item => item.DateShip.Value.Month >= DateTime.Now.Month 
                && item.DateShip.Value.Year <= DateTime.Now.Year).ToList();

            foreach (var order in listOrder)
            {
                totalBuy += order.TotalQuantity;
            }

            return totalBuy;
        }

        public IQueryable<Order> GetDataAmount(int choose,int year)
        {
            var lorders = _dbContext.Orders.Where(o => o.State == 5 && o.DatePayment >= DateTime.Now && o.DatePayment <= DateTime.Now);

            switch (choose)
            {
                case 1:
                    DateTime fromDate = StartOfWeek(DateTime.Now,DayOfWeek.Monday);
                    DateTime toDate = StartOfWeek(DateTime.Now, DayOfWeek.Sunday).AddDays(6);
                    var lorders1 = _dbContext.Orders.Where(o => o.State == 5 && o.DatePayment >= fromDate && o.DatePayment <= toDate);
                    lorders1 = lorders1.OrderBy(o => o.DatePayment);
                    lorders = lorders1;
                    break;
                case 2:
                    DateTime fromDate2 = new DateTime(year, 1, 1);
                    DateTime toDate2 = new DateTime(year, 12, 31);
                     var lorders2 = _dbContext.Orders.Where(o => o.State == 5 && o.DatePayment >= fromDate2 && o.DatePayment <= toDate2);
                    lorders = lorders2;
                    break;
                case 3:
                    DateTime fromDate3 = new DateTime(year, 1, 1);
                    DateTime toDate3 = new DateTime(year, 12, 31);
                    var lorders3 = _dbContext.Orders.Where(o => o.State == 5 && o.DatePayment >= fromDate3 && o.DatePayment <= toDate3);
                    lorders = lorders3;
                    break;
                case 4:
                    DateTime fromDate4 = new DateTime(year, 1, 1);
                    DateTime toDate4 = new DateTime(year+1, 12, 31);
                    var lorders4 = _dbContext.Orders.Where(o => o.State == 5 && o.DatePayment >= fromDate4 && o.DatePayment <= toDate4);
                    lorders = lorders4;
                    break;
            }    
            return lorders.AsQueryable();
        }

        public DateTime StartOfWeek(DateTime dt, DayOfWeek startOfWeek)
        {
            int diff = (7 + (dt.DayOfWeek - startOfWeek)) % 7;
            return dt.AddDays(-1 * diff).Date;
        }

        public int GetDataOrdersCompleted(DateTime fromDate, DateTime toDate)
        {
            int countOrders = _dbContext.Orders.Where(o => o.State == 5 && o.DatePayment >= fromDate && o.DatePayment <= toDate).Count();
            return countOrders;
        }

        public int GetDataOrdersCancelReturn(DateTime fromDate, DateTime toDate)
        {
            int countOrders = _dbContext.Orders.Where(o => o.State == 6 || o.State == 7 && o.DatePayment >= fromDate && o.DatePayment <= toDate).Count();
            return countOrders;
        }



    }
}
