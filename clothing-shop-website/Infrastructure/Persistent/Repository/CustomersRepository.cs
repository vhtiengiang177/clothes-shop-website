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

        //public IQueryable<Customer> GetAllCustomersByIDType(int TypeID)
        //{
        //    var query = _dbContext.Customers.Join(_dbContext.Accounts, cus => cus.IdAccount, acc => acc.Id, (cus, acc) => new
        //    {
        //        Id = cus.IdAccount,
        //        FirstName = cus.FirstName,
        //        LastName = cus.LastName,
        //        VerifyEmail = cus.VerifyEmail,
        //        IdTypeCustomer = cus.IdTypeCustomer,
        //        Point = cus.Point,
        //        State = acc.State
        //    }).Where(customer => customer.State > 0 && customer.IdTypeCustomer==TypeID);

        //    return query;
        //}

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

        IQueryable<Customer> ICustomersRepository.GetAllCustomersByIDType(int TypeID)
        {
            throw new System.NotImplementedException();
        }
    }
}
