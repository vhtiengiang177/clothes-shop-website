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
        private IRepository<Category> _categoriesRepository;
        private IRepository<Color> _colorsRepository;
        private IRepository<Size> _sizesRepository;
        private IRepository<Product_Size_Color> _productSizesRepository;
        private IRepository<Log_Product> _logProductsRepository;
        private IRepository<Promotion> _promotionsRepository;
        //private IRepository<Customer> _customersRepository;
        private IRepository<Staff> _staffRepository;
        private IRepository<Account> _accountsRepository;



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

        public IRepository<Promotion> PromotionsRepository
        {
            get
            {
                if (_promotionsRepository == null)
                    _promotionsRepository = new GenericRepository<Promotion>(_dbContext);
                return _promotionsRepository;
            }
        }

        //public IRepository<Customer> CustomersRepository
        //{
        //    get
        //    {
        //        if (_customersRepository == null)
        //            _customersRepository = new GenericRepository<Customer>(_dbContext);
        //        return _customersRepository;
        //    }
        //}

        public IRepository<Staff> StaffRepository
        {
            get
            {
                if (_staffRepository == null)
                    _staffRepository = new GenericRepository<Staff>(_dbContext);
                return _staffRepository;
            }
        }

        public IRepository<Account> AccountsRepository
        {
            get
            {
                if (_accountsRepository == null)
                    _accountsRepository = new GenericRepository<Account>(_dbContext);
                return _accountsRepository;
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