using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using clothing_shop_website.Model;

namespace clothing_shop_website.Services
{
    public class CategoriesService
    {
        public IQueryable<Category> SortListCategory(string sort, IQueryable<Category> lCategory)
        {
            switch (sort)
            {
                case "createddate:asc":
                    lCategory = lCategory.OrderBy(p => p.CreatedDate).AsQueryable();
                    break;
                case "createddate:desc":
                    lCategory = lCategory.OrderByDescending(p => p.CreatedDate).AsQueryable();
                    break;
                case "modifyddate:asc":
                    lCategory = lCategory.OrderBy(p => p.LastModified).AsQueryable();
                    break;
                case "modifyddate:desc":
                    lCategory = lCategory.OrderByDescending(p => p.LastModified).AsQueryable();
                    break;
                case "name:desc":
                    lCategory = lCategory.OrderByDescending(p => p.Name).AsQueryable();
                    break;
                case "name:asc":
                    lCategory = lCategory.OrderBy(p => p.Name).AsQueryable();
                    break;
                case "id:asc":
                    lCategory = lCategory.OrderBy(p => p.Id).AsQueryable();
                    break;
                default:
                    lCategory = lCategory.OrderByDescending(p => p.Id).AsQueryable();
                    break;
            }

            return lCategory;
        }
        public IQueryable<Category> FilterCategory(FilterParamsCategories filterParams, IQueryable<Category> lCategory)
        {
            if (filterParams.Content != null)
                lCategory = lCategory.Where(p => p.Name.ToLower().Contains(filterParams.Content.ToLower()));
            return lCategory.AsQueryable();
        }
    }
}
