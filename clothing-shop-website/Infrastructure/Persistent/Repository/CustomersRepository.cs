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
        public IQueryable<Account> GetAllAccountCustomers()
        {
            var lAccount = _dbContext.Accounts.Where(a => a.IdTypeAccount == 4).ToList();
          
            return lAccount.AsQueryable();
        }

        public IQueryable<Customer> GetAllCustomersByIDType(int TypeID)
        {
            var lAccount = _dbContext.Accounts.Where(a => a.State > 0 && a.IdTypeAccount == 4).Select(a => a.Id).ToList();
            var lCustomer = _dbContext.Customers.Where(c => lAccount.Contains(c.IdAccount) && c.IdTypeCustomer== TypeID);

            return lCustomer.AsQueryable();
        }

        public Customer GetCustomerByID(int customerID)
        {
            return _dbContext.Customers.FirstOrDefault(p => p.IdAccount == customerID);
        }

        public void UpdateCustomer(Customer customer)
        {
            _dbContext.Attach(customer);
            _dbContext.Entry(customer).State = EntityState.Modified;
        }
        
        public void DeleteCustomer(int accountId)
        {
            var account = _dbContext.Accounts.Where(a => a.Id == accountId).FirstOrDefault();
            account.State = 0;
            _dbContext.Attach(account);
            _dbContext.Entry(account).State = EntityState.Modified;
        }
        public IQueryable<Customer> GetlCustomersByTypeCustomerID(int[] idTypeCustomers)
        {
            int[] distinctIdTypeCustomers = idTypeCustomers.Distinct().ToArray();

            var lCustomer = _dbContext.Customers
                                    .Where(p => distinctIdTypeCustomers.Contains((int)p.IdTypeCustomer)).ToList();

            return lCustomer.AsQueryable();
        }

    
    }
}
