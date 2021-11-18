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
         void UpdateCustomer(Customer Customer);
         void DeleteCustomer(int accountId);
         public Customer GetCustomerByID(int CustomerID);
         IQueryable<Customer> GetlCustomersByTypeCustomerID(int[] idTypeCustomers);



    }
}
