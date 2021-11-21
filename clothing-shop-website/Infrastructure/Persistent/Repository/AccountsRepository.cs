using Domain.Entity;
using Domain.Infrastructure.Persistent.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistent.Repository
{
    public class AccountsRepository: IAccountsRepository
    {
        private DataDbContext _dbContext;

        public AccountsRepository(DataDbContext dataDbContext)
        {
            _dbContext = dataDbContext;
        }

        public async Task<IQueryable<Account>> GetAllAccounts()
        {
            var lAccount = await _dbContext.Accounts.Where(p => p.State > 0).ToListAsync();

            return lAccount.AsQueryable();
        }

        public Account GetAccountByID(int accountID)
        {
            return _dbContext.Accounts.FirstOrDefault(p => p.Id == accountID && p.State > 0);
        }
        public Account CreateAccount(Account account, Customer customer, Staff staff)
        {
            try
            {
                var result = _dbContext.Accounts.Add(account);
                _dbContext.SaveChanges();

                var idAccount = _dbContext.Accounts.OrderByDescending(s => s.Id).FirstOrDefault().Id;

                if (account.IdTypeAccount == 4)
                {
                    customer.IdAccount = idAccount;
                    _dbContext.Customers.Add(customer);
                    _dbContext.SaveChanges();

                }
                else
                {
                    staff.IdAccount = idAccount;
                    _dbContext.Staff.Add(staff);
                    _dbContext.SaveChanges();
                }
                return result.Entity;
            }
            catch
            {
                throw;
            }
        }
        public void UpdateAccount(Account account)
        {
            _dbContext.Attach(account);
            _dbContext.Entry(account).State = EntityState.Modified;
        }
        public IQueryable<Account> GetAccountsByTypeAccountsID(int[] IdTypeAccouts)
        {
            int[] distinctIdypeAccouts = IdTypeAccouts.Distinct().ToArray();

            var lAccount = _dbContext.Accounts
                                    .Where(p => distinctIdypeAccouts.Contains((int)p.IdTypeAccount)).ToList();

            return lAccount.AsQueryable();
        }

        public async Task<Account> Login(string email, string password)
        {
            Account account = await _dbContext.Accounts.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
            return account;
        }

    }
}
