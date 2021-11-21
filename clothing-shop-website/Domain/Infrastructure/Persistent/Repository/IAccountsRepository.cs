using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Infrastructure.Persistent.Repository
{
    public interface IAccountsRepository
    {
        Task<IQueryable<Account>> GetAllAccounts();
        Account GetAccountByID(int accountID);
        Account CreateAccount(Account account, Customer customer, Staff staff);
        void UpdateAccount(Account account);
        IQueryable<Account> GetAccountsByTypeAccountsID(int[] IdTypeAccouts);
        Task<Account> Login(string username, string password);
    }
}
