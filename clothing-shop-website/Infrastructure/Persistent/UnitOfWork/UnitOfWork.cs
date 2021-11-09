using Domain.Entity;
using Domain.Infrastructure.Persistent.Repository;
using Infrastructure.Persistent.Repository;

namespace Infrastructure.Persistent.UnitOfWork
{
    public class UnitOfWork
    {
        private DataDbContext _dbContext;
        private IProductsRepository _productsRepository;
        private IRepository<Category> _categoriesRepository;
        private IRepository<Color> _colorsRepository;
        private IRepository<Size> _sizesRepository;
        private IRepository<Product_Size_Color> _productSizesRepository;
        private IRepository<Log_Product> _logProductsRepository;



        public UnitOfWork(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IProductsRepository ProductsRepository {
            get {
                if (_productsRepository == null)
                    _productsRepository = new ProductsRepository(_dbContext);
                return _productsRepository;
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