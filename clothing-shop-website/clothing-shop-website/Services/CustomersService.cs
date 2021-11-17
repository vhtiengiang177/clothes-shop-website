using clothing_shop_website.Model;
using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Services
{
    public class CustomersService
    {
        public IQueryable<Customer> SortListCustomer(string sort, IQueryable<Customer> lCustomer)
        {
            switch (sort)
            {
                case "point:asc":
                    lCustomer = lCustomer.OrderBy(p => p.Point).AsQueryable();
                    break;
                case "point:desc":
                    lCustomer = lCustomer.OrderByDescending(p => p.Point).AsQueryable();
                    break;
                case "typecustomer:asc":
                    lCustomer = lCustomer.OrderBy(p => p.IdTypeCustomer).AsQueryable();
                    break;
                case "typecustomer:desc":
                    lCustomer = lCustomer.OrderByDescending(p => p.IdTypeCustomer).AsQueryable();
                    break;
                case "lastname:desc":
                    lCustomer = lCustomer.OrderByDescending(p => p.LastName).AsQueryable();
                    break;
                case "lastname:asc":
                    lCustomer = lCustomer.OrderBy(p => p.LastName).AsQueryable();
                    break;
                case "id:asc":
                    lCustomer = lCustomer.OrderBy(p => p.IdAccount).AsQueryable();
                    break;
                default:
                    lCustomer = lCustomer.OrderByDescending(p => p.IdAccount).AsQueryable();
                    break;
            }

            return lCustomer;
        }
        public IQueryable<Customer> FilterCustomer(FilterParamsCustomer filterParams, IQueryable<Customer> lCustomerItems)
        {
            if (filterParams.Content != null)
                lCustomerItems = lCustomerItems.Where(p => p.LastName.ToLower().Contains(filterParams.Content.ToLower())
                || p.Point.ToString().Contains(filterParams.Content));

            return lCustomerItems.AsQueryable();
        }
    }
}
