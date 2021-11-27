using clothing_shop_website.Model;
using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Services
{
    public class PromotionsService
    {
        public IQueryable<Promotion> SortListPromotion(string sort, IQueryable<Promotion> lPromotion)
        {
            switch (sort)
            {
                case "createddate:asc":
                    lPromotion = lPromotion.OrderBy(p => p.CreatedDate).AsQueryable();
                    break;
                case "createddate:desc":
                    lPromotion = lPromotion.OrderByDescending(p => p.CreatedDate).AsQueryable();
                    break;
                case "startdate:asc":
                    lPromotion = lPromotion.OrderBy(p => p.StartDate).AsQueryable();
                    break;
                case "startdate:desc":
                    lPromotion = lPromotion.OrderByDescending(p => p.StartDate).AsQueryable();
                    break;
                case "enddate:asc":
                    lPromotion = lPromotion.OrderBy(p => p.EndDate).AsQueryable();
                    break;
                case "enddate:desc":
                    lPromotion = lPromotion.OrderByDescending(p => p.EndDate).AsQueryable();
                    break;
                case "value:asc":
                    lPromotion = lPromotion.OrderBy(p => p.Value).AsQueryable();
                    break;
                case "value:desc":
                    lPromotion = lPromotion.OrderByDescending(p => p.Value).AsQueryable();
                    break;
                case "name:desc":
                    lPromotion = lPromotion.OrderByDescending(p => p.Name).AsQueryable();
                    break;
                case "name:asc":
                    lPromotion = lPromotion.OrderBy(p => p.Name).AsQueryable();
                    break;
                case "id:asc":
                    lPromotion = lPromotion.OrderBy(p => p.Id).AsQueryable();
                    break;
                default:
                    lPromotion = lPromotion.OrderByDescending(p => p.Id).AsQueryable();
                    break;
            }

            return lPromotion;
        }
        public IQueryable<Promotion> FilterPromotion(FilterParamsPromotion filterParams, IQueryable<Promotion> lPromotion)
        {
            if (filterParams.Content != null)
                lPromotion = lPromotion.Where(p => p.Name.ToLower().Contains(filterParams.Content.ToLower()));
            return lPromotion.AsQueryable();
        }
    }
}
