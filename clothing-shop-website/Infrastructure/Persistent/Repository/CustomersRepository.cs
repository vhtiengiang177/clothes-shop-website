using Domain.Entity;
using Domain.Infrastructure.Persistent.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistent.Repository
{
    public class CustomersRepository: ICustomersRepository
    {
        private DataDbContext _dbContext;
        public CustomersRepository(DataDbContext dataDbContext)
        {
            _dbContext = dataDbContext;
        }
        public IQueryable<Customer> GetAllCustomers()
        {
            var lAccount = _dbContext.Accounts.Where(a => a.State > 0 && a.IdTypeAccount==4).Select(a=>a.Id).ToList();
            var lCustomer = _dbContext.Customers.Where(c => lAccount.Contains(c.IdAccount));
            
            return lCustomer.AsQueryable();
        }

        public IQueryable<Customer> GetAllCustomersByIDType(int TypeID)
        {
            var lAccount = _dbContext.Accounts.Where(a => a.State > 0 && a.IdTypeAccount == 4).Select(a => a.Id).ToList();
            var lCustomer = _dbContext.Customers.Where(c => lAccount.Contains(c.IdAccount) && c.IdTypeCustomer== TypeID);

            return lCustomer.AsQueryable();
        }

        public Customer GetCustomerByID(int CustomerID)
        {
            return _dbContext.Customers.FirstOrDefault(p => p.IdAccount == CustomerID);
        }
        public Customer CreateCustomer(Customer Customer)
        {
            var result = _dbContext.Customers.Add(Customer);

            return result.Entity;
        }
        public void UpdateCustomer(Customer Customer)
        {
            _dbContext.Attach(Customer);
            _dbContext.Entry(Customer).State = EntityState.Modified;
        }

        
    }
}
