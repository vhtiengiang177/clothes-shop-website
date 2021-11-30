using Domain.Entity;
using Domain.Infrastructure.Persistent.Repository;
using Infrastructure.Persistent.Repository;

namespace Infrastructure.Persistent.UnitOfWork
{
    public class UnitOfWork
    {
        private DataDbContext _dbContext;
        private IProductsRepository _productsRepository;
        private ICustomersRepository _customersRepository;
        private IAccountsRepository _accountsRepository;
        private IStaffRepository _staffRepository;
        private ICartsRepository _cartsRepository;
        private IOrdersRepository _ordersRepository;
        private IDeliveryAddressRepository _deliveryAddressRepository;
        private IPromotionsRepository _promotionsRepository;
        private IRepository<Category> _categoriesRepository;
        private IRepository<Color> _colorsRepository;
        private IRepository<Size> _sizesRepository;
        private IRepository<Product_Size_Color> _productSizesRepository;
        private IRepository<Log_Product> _logProductsRepository;
        private IRepository<Image> _imagesRepository;
        private IRepository<ShopInfo> _shopInfosRepository;
       
        public UnitOfWork(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IProductsRepository ProductsRepository 
        {
            get {
                if (_productsRepository == null)
                    _productsRepository = new ProductsRepository(_dbContext);
                return _productsRepository;
            }
        }

        public ICustomersRepository CustomersRepository
        {
            get
            {
                if (_customersRepository == null)
                    _customersRepository = new CustomersRepository(_dbContext);
                return _customersRepository;
            }
        }

        public IAccountsRepository AccountsRepository
        {
            get
            {
                if (_accountsRepository == null)
                    _accountsRepository = new AccountsRepository(_dbContext);
                return _accountsRepository;
            }
        }

        public IStaffRepository StaffRepository
        {
            get
            {
                if (_staffRepository == null)
                    _staffRepository = new StaffRepository(_dbContext);
                return _staffRepository;
            }
        }

        public ICartsRepository CartsRepository
        {
            get
            {
                if (_cartsRepository == null)
                    _cartsRepository = new CartsRepository(_dbContext);
                return _cartsRepository;
            }
        }

        public IOrdersRepository OrdersRepository
        {
            get
            {
                if (_ordersRepository == null)
                    _ordersRepository = new OrdersRepository(_dbContext);
                return _ordersRepository;
            }
        }
        public IDeliveryAddressRepository DeliveryAddressRepository
        {
            get
            {
                if (_deliveryAddressRepository == null)
                    _deliveryAddressRepository = new DeliveryAddressRepository(_dbContext);
                return _deliveryAddressRepository;
            }
        }
        public IPromotionsRepository PromotionsRepository
        {
            get
            {
                if (_promotionsRepository == null)
                    _promotionsRepository = new PromotionsRepository(_dbContext);
                return _promotionsRepository;
            }
        }

        public IRepository<Category> CategoriesRepository {
            get {
                if (_categoriesRepository == null)
                    _categoriesRepository = new GenericRepository<Category>(_dbContext);
                return _categoriesRepository;
            }
        }
       
        public IRepository<Product_Size_Color> ProductSizeColorsRepository
        {
            get
            {
                if (_productSizesRepository == null)
                    _productSizesRepository = new GenericRepository<Product_Size_Color>(_dbContext);
                return _productSizesRepository;
            }
        }

        public IRepository<Log_Product> LogProductsRepository
        {
            get
            {
                if (_logProductsRepository == null)
                    _logProductsRepository = new GenericRepository<Log_Product>(_dbContext);
                return _logProductsRepository;
            }
        }

        public IRepository<Color> ColorsRepository {
            get {
                if (_colorsRepository == null)
                    _colorsRepository = new GenericRepository<Color>(_dbContext);
                return _colorsRepository;
            }
        }

        public IRepository<Size> SizesRepository {
            get {
                if (_sizesRepository == null)
                    _sizesRepository = new GenericRepository<Size>(_dbContext);
                return _sizesRepository;
            }
        }

        public IRepository<Image> ImagesRepository
        {
            get
            {
                if (_imagesRepository == null)
                    _imagesRepository = new GenericRepository<Image>(_dbContext);
                return _imagesRepository;
            }
        }

        public IRepository<ShopInfo> ShopInfosRepository
        {
            get
            {
                if (_shopInfosRepository == null)
                    _shopInfosRepository = new GenericRepository<ShopInfo>(_dbContext);
                return _shopInfosRepository;
            }
        }

        public bool Save()
        {
            try {
                _dbContext.SaveChanges();
                return true;
            }
            catch {
                return false;
            }
        }
    }
}