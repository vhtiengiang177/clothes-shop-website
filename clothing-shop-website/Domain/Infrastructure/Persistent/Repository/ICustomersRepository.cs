using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Domain.Infrastructure.Persistent.Repository
{
    public interface ICustomersRepository
    {
         IQueryable<Customer> GetAllCustomers();
         IQueryable<Customer>  GetAllCustomersByIDType(int TypeID);
         Customer CreateCustomer(Customer Customer);
         void UpdateCustomer(Customer Customer);
         public Customer GetCustomerByID(int CustomerID);

    }
}
