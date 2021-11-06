using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entity;

namespace Infrastructure.Persistent.Repository
{
    public class CategoriesRepository
    {
        private DataDbContext _dbContext;
        public CategoriesRepository(DataDbContext dataDbContext)
        {
            this._dbContext = dataDbContext;
        }
        public async Task<IQueryable<Category>> GetAllCategories()
        {
            var lCategory = await _dbContext.Categories.ToListAsync();

            return lCategory.AsQueryable();
        }

        

    }
}
