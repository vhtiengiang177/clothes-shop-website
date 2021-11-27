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
                case "totalquantity:asc":
                    lOrder = lOrder.OrderBy(p => p.TotalQuantity).AsQueryable();
                    break;
                case "totalquantity:desc":
                    lOrder = lOrder.OrderByDescending(p => p.TotalQuantity).AsQueryable();
                    break;
                case "totalamount:asc":
                    lOrder = lOrder.OrderBy(p => p.TotalAmount).AsQueryable();
                    break;
                case "totalamount:desc":
                    lOrder = lOrder.OrderByDescending(p => p.TotalAmount).AsQueryable();
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
        //        lOrder = lOrder.Where(p => p.Name.ToLower().Contains(filterParams.Content.ToLower()));
        //    return lOrder.AsQueryable();
        //}
    }
}
