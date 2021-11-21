using clothing_shop_website.Model;
using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Services
{
    public class StaffService
    {
        public IQueryable<Staff> SortListStaff(string sort, IQueryable<Staff> lStaff)
        {
            switch (sort)
            {
                case "lastname:desc":
                    lStaff = lStaff.OrderByDescending(p => p.LastName).AsQueryable();
                    break;
                case "lastname:asc":
                    lStaff = lStaff.OrderBy(p => p.LastName).AsQueryable();
                    break;
                case "id:asc":
                    lStaff = lStaff.OrderBy(p => p.IdAccount).AsQueryable();
                    break;
                default:
                    lStaff = lStaff.OrderByDescending(p => p.IdAccount).AsQueryable();
                    break;
            }

            return lStaff;
        }
        public IQueryable<Staff> FilterStaff(FilterParamsStaff filterParams, IQueryable<Staff> lStaffItems)
        {
            if (filterParams.Content != null)
                lStaffItems = lStaffItems.Where(p => p.LastName.ToLower().Contains(filterParams.Content.ToLower())
                || p.Phone.ToString().Contains(filterParams.Content));

            return lStaffItems.AsQueryable();
        }
    }
}
