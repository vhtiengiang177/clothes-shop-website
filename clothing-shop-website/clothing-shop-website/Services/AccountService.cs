using clothing_shop_website.Model;
using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Services
{
    public class AccountService
    {
        public IQueryable<Account> SortListAccount(string sort, IQueryable<Account> lAccount)
        {
            switch (sort)
            {
                case "email:desc":
                    lAccount = lAccount.OrderByDescending(p => p.Email).AsQueryable();
                    break;
                case "email:asc":
                    lAccount = lAccount.OrderBy(p => p.Email).AsQueryable();
                    break;
                case "id:asc":
                    lAccount = lAccount.OrderBy(p => p.Id).AsQueryable();
                    break;
                default:
                    lAccount = lAccount.OrderByDescending(p => p.Id).AsQueryable();
                    break;
            }

            return lAccount;
        }
        public IQueryable<Account> FilterAccount(FilterParamsAccount filterParams, IQueryable<Account> lAccount)
        {
            if (filterParams.Content != null)
                lAccount = lAccount.Where(p => p.Email.ToLower().Contains(filterParams.Content.ToLower()));
            return lAccount.AsQueryable();
        }
    }
}
