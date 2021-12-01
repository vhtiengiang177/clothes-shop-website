using Domain.Entity;
using Domain.Infrastructure.Persistent.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistent.Repository
{
    public class StaffRepository : IStaffRepository
    {
        private DataDbContext _dbContext;

        public StaffRepository(DataDbContext dataDbContext)
        {
            _dbContext = dataDbContext;
        }

        public IQueryable<Staff> GetAllStaff()
        {
            var lAccount = _dbContext.Accounts.Where(a => a.State > 0 && a.IdTypeAccount != 4).Select(a => a.Id).ToList();
            var lStaff= _dbContext.Staff.Where(c => lAccount.Contains(c.IdAccount));

            return lStaff.AsQueryable();
        }

        //public IQueryable<Staff> GetAllStaffByIDType(int TypeID)
        //{
        //    var lAccount = _dbContext.Accounts.Where(a => a.State > 0 && a.IdTypeAccount == 4).Select(a => a.Id).ToList();
        //    var lStaff= _dbContext.Staff.Where(c => lAccount.Contains(c.IdAccount) && c.Id== TypeID);

        //    return lStaff.AsQueryable();
        //}

        public IQueryable<Account> GetAllAccountStaff()
        {
            var lAccount = _dbContext.Accounts.Where(a => a.IdTypeAccount != 4 && a.State > 0).ToList();

            return lAccount.AsQueryable();
        }


        public Staff GetStaffByID(int staffID)
        {
            return _dbContext.Staff.FirstOrDefault(p => p.IdAccount == staffID);
        }

        public Staff CreateStaff(Staff staff)
        {
            try
            {
                var result = _dbContext.Staff.Add(staff);
                _dbContext.SaveChanges();
                return result.Entity;
            }
            catch
            {
                throw;
            }
        }

        public void UpdateStaff(Staff staff)
        {
            _dbContext.Attach(staff);
            _dbContext.Entry(staff).State = EntityState.Modified;
        }

        public void DeleteStaff(int accountId)
        {
            var account = _dbContext.Accounts.Where(a => a.Id == accountId).FirstOrDefault();
            account.State = 0;
            _dbContext.Attach(account);
            _dbContext.Entry(account).State = EntityState.Modified;
        }
        public IQueryable<Staff> GetlStaffByTypeStaffID(int[] idTypeStaff)
        {
            int[] distinctIdTypeStaff = idTypeStaff.Distinct().ToArray();
            var lAccount = _dbContext.Accounts
                                    .Where(a => a.State > 0).ToList();

            var lAccountID = lAccount
                                    .Where(p => distinctIdTypeStaff.Contains((int)p.IdTypeAccount)).Select(a => a.Id).ToList();

            var lStaff = _dbContext.Staff.Where(c => lAccountID.Contains(c.IdAccount));
            return lStaff.AsQueryable();
        }
    }
}
