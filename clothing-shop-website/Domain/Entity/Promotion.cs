using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Promotion
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Value { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int State { get; set; } = 3; //0: Đã xóa     1:Hết hạn       2: Còn hạn - Ẩn trên client page(apply sản phẩm)    3:Còn hạn - Hiện trên client page(apply hóa đơn)
        public DateTime CreatedDate { get; set; }
        public DateTime? LastModified { get; set; }
        public int CreatedById { get; set; }
        public int? ModifiedById { get; set; }
        public string? Image { get; set; }
        public string? PublicId { get; set; }
        public int? IsMainBanner { get; set; } = 0; //0: img bình thường    1:img dùng làm banner
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
