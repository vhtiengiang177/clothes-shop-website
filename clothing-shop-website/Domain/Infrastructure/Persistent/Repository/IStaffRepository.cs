using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Domain.Infrastructure.Persistent.Repository
{
    public interface IStaffRepository
    {
        IQueryable<Staff> GetAllStaff();
        Staff GetStaffByID(int staffID);
        public void UpdateStaff(Staff staff);
        Staff CreateStaff(Staff staff);
        void DeleteStaff(int accountId);
        IQueryable<Staff> GetlStaffByTypeStaffID(int[] idTypeStaff);
    }
}
