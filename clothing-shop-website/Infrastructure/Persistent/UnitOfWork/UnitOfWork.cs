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
        private IRepository<Style> _stylesRepository;
        private IRepository<Color> _colorsRepository;
        private IRepository<Size> _sizesRepository;
        //private IRepository<Material> _materialsRepository;
        private IRepository<Product_Size_Color> _productSizesRepository;
        //private IRepository<Product_Material> _productMaterialsRepository;


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
       

        public IRepository<Product_Size_Color> ProductSizesRepository
        {
            get
            {
                if (_productSizesRepository == null)
                    _productSizesRepository = new GenericRepository<Product_Size_Color>(_dbContext);
                return _productSizesRepository;
            }
        }


        public IRepository<Style> StylesRepository {
            get {
                if (_stylesRepository == null)
                    _stylesRepository = new GenericRepository<Style>(_dbContext);
                return _stylesRepository;
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
        //public IRepository<Material> MaterialsRepository {
        //    get {
        //        if (_materialsRepository == null)
        //            _materialsRepository = new GenericRepository<Material>(_dbContext);
        //        return _materialsRepository;
        //    }
        //}

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