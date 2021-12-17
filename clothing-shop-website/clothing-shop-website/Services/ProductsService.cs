using clothing_shop_website.Model;
using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Services
{
    public class ProductsService
    {
        public IQueryable<Product> SortListProducts(string sort, IQueryable<Product> lProduct)
        {
            switch (sort)
            {
                case "price:asc":
                    lProduct = lProduct.OrderBy(p => p.UnitPrice).AsQueryable();
                    break;
                case "price:desc":
                    lProduct = lProduct.OrderByDescending(p => p.UnitPrice).AsQueryable();
                    break;
                case "totalbuy:asc":
                    lProduct = lProduct.OrderBy(p => p.TotalBuy).AsQueryable();
                    break;
                case "totalbuy:desc":
                    lProduct = lProduct.OrderByDescending(p => p.TotalBuy).AsQueryable();
                    break;
                case "sku:asc":
                    lProduct = lProduct.OrderBy(p => p.Sku).AsQueryable();
                    break;
                case "sku:desc":
                    lProduct = lProduct.OrderByDescending(p => p.Sku).AsQueryable();
                    break;
                case "name:desc":
                    lProduct = lProduct.OrderByDescending(p => p.Name).AsQueryable();
                    break;
                case "name:asc":
                    lProduct = lProduct.OrderBy(p => p.Name).AsQueryable();
                    break;
                case "id:asc":
                    lProduct = lProduct.OrderBy(p => p.Id).AsQueryable();
                    break;
                default:
                    lProduct = lProduct.OrderByDescending(p => p.Id).AsQueryable();
                    break;
            }

            return lProduct;
        }
        public IQueryable<Product> FilterProduct(FilterParamsProduct filterParams, IQueryable<Product> lProductItems)
        {
            if (filterParams.MinPrice.HasValue)
                lProductItems = lProductItems.Where(x => x.UnitPrice >= filterParams.MinPrice);

            if (filterParams.MaxPrice.HasValue)
                lProductItems = lProductItems.Where(x => x.UnitPrice <= filterParams.MaxPrice);

            if (filterParams.Content != null)
                lProductItems = lProductItems.Where(p => p.Name.ToLower().Contains(filterParams.Content.ToLower())
                || p.TotalBuy.ToString().Contains(filterParams.Content));

            return lProductItems.AsQueryable();
        }
    }
}
