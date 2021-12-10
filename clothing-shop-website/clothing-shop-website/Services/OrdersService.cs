using clothing_shop_website.Model;
using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Services
{
    public class OrdersService
    {
        public IQueryable<Order> SortListOrder(string sort, IQueryable<Order> lOrder)
        {
            switch (sort)
            {
                case "dateorder:asc":
                    lOrder = lOrder.OrderBy(p => p.DateOrder).AsQueryable();
                    break;
                case "dateorder:desc":
                    lOrder = lOrder.OrderByDescending(p => p.DateOrder).AsQueryable();
                    break;
                case "datepayment:asc":
                    lOrder = lOrder.OrderBy(p => p.DatePayment).AsQueryable();
                    break;
                case "datepayment:desc":
                    lOrder = lOrder.OrderByDescending(p => p.DatePayment).AsQueryable();
                    break;
                case "dateship:asc":
                    lOrder = lOrder.OrderBy(p => p.DateShip).AsQueryable();
                    break;
                case "dateship:desc":
                    lOrder = lOrder.OrderByDescending(p => p.DateShip).AsQueryable();
                    break;
                case "idshipper:asc":
                    lOrder = lOrder.OrderBy(p => p.IdShipper).AsQueryable();
                    break;
                case "idshipper:desc":
                    lOrder = lOrder.OrderByDescending(p => p.IdShipper).AsQueryable();
                    break;
                case "idemployee:asc":
                    lOrder = lOrder.OrderBy(p => p.IdStaff).AsQueryable();
                    break;
                case "idemployee:desc":
                    lOrder = lOrder.OrderByDescending(p => p.IdStaff).AsQueryable();
                    break;
                case "id:asc":
                    lOrder = lOrder.OrderBy(p => p.Id).AsQueryable();
                    break;
                default:
                    lOrder = lOrder.OrderByDescending(p => p.Id).AsQueryable();
                    break;
            }

            return lOrder;
        }

        //public IQueryable<Order> FilterOrder(FilterParamsOrder filterParams, IQueryable<Order> lOrder)
        //{
        //    if (filterParams.Content != null)
        //        lOrder = lOrder.Where(p => p..ToLower().Contains(filterParams.Content.ToLower()));
        //    return lOrder.AsQueryable();
        //}
    }
}
