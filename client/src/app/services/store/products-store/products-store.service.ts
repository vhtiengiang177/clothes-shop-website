import { Favorite } from './../../model/favorite/favorite.model';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { FavoriteService } from '../../data/favorite/favorite.service';
import { ProductService } from '../../data/product/product.service';
import { FilterParamsProduct } from '../../model/product/filter-params-product.model';
import { Image } from '../../model/product/image.model';
import { LogProduct } from '../../model/product/log-product.model';
import { ProductSizeColor } from '../../model/product/product-size-color.model';
import { Product } from '../../model/product/product.model';
import { FavoriteStoreService } from '../favorite-store/favorite-store.service';
import { AuthAppService } from '../../auth/auth.service';
import { CategoriesStoreService } from '../categories-store/categories-store.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsStoreService {

  private readonly _products = new BehaviorSubject<Product[]>([])
  readonly products$ = this._products.asObservable()

  private readonly _totalData = new BehaviorSubject<number>(0);
  readonly totalData$ = this._totalData.asObservable();

  constructor(private productService: ProductService,
    private favoriteService: FavoriteService,
    private categoriesStore: CategoriesStoreService,
    private authService: AuthAppService,

    private toastr: ToastrService) {
      if (this.products.length == 0) {
        let filter: FilterParamsProduct = {};
        this.getProductsForClientPage(filter);
      }
  }

  get products(): Product[] {
    return this._products.getValue();
  }

  set products(val: Product[]) {
    this._products.next(val);
  }

  get totalData(): number {
    return this._totalData.getValue();
  }

  set totalData(val: number) {
    this._totalData.next(val);
  }

  async getAll(filterParams: FilterParamsProduct) {
    await this.productService.get(filterParams)
      .subscribe(res => {
        this.products = res.data;
        this.totalData = res.totalData;
      },
        (error: AppError) => {
          if (error instanceof BadRequestError)
            this.toastr.error("That's an error", "Bad Request")
          else this.toastr.error("An unexpected error occurred.")
        });
  }

  getById(id) {
    return this.productService.getById("/GetProductByID", id)
  }

  delete(id) {
    return this.productService.delete(id)
  }

  getTopBestSellers() {
    let result = new Subject<Product[]>();
    this.productService.getTopBestSellers()
      .subscribe(res => {
        result.next(res)
      })
      return result.asObservable()
  }

  getTopNewProducts() {
    let result = new Subject<Product[]>();
    this.productService.getTopNewProducts()
      .subscribe(res => {
        result.next(res)
      })
      return result.asObservable()
  }

  getFavoriteProducts() {
      let result = new Subject<Product[]>();
      this.productService.getFavoriteProducts()
        .subscribe(res => {
          result.next(res)
        })
        return result.asObservable()
    }

  create(productObj) {
    let result = new Subject<Product>();
    this.productService.create("/createproduct", productObj).subscribe(res => {
      result.next(res)
      this.toastr.success("Added successfully", "Product #" + res.id)
    }, (error: AppError) => {
      if (error instanceof BadRequestError)
        return this.toastr.error("Add product failed")
      else this.toastr.error("An unexpected error occurred.", "Add Product")
    })
    return result.asObservable()
  }

  update(productObj) {
    return this.productService.update("/UpdateProduct", productObj.id, productObj)
  }

  addItemOfProduct(log_product: LogProduct) {
    return this.productService.addItemOfProduct(log_product)
  }

  deleteItemOfProduct(psc) {
    return this.productService.deleteItemOfProduct(psc)
  }

  addImageProduct(id, file) {
    return this.productService.addImageProduct(id, file)
  }

  deleteImageProduct(id) {
    return this.productService.deleteImageProduct(id)
  }

  getImagesByIdProduct(idProduct) {
    let result = new Subject<Image[]>();
    this.productService.getImagesByIdProduct(idProduct).subscribe(res => {
      result.next(res)
    })

    return result.asObservable()
  }

  async getProductsForClientPage(filterParams: FilterParamsProduct) {
    await this.productService.getProductsForClientPage(filterParams)
      .subscribe(res => {
        this.products = res.data;
        this.totalData = res.totalData;
        
        this.products.forEach(item => {
          item.imageUrl = "assets/product.jpg"
          this.productService.getImagesByIdProduct(item.id).subscribe(res => {
            if (res.length != 0) {
              if (res[0].url) {
                item.imageUrl = res[0].url 
              }
            }
          });
          item.isFavorite = false
          if (this.authService.isLoggedIn() && this.authService.getCurrentUser().idTypeAccount == 4){
            let favorite: Favorite
            this.favoriteService.getItemFavorite(item.id).subscribe(res => {
              favorite = res;
              if (favorite != null){
                  item.isFavorite=true
                }
            });
            
            };
          
          item.category = this.categoriesStore.categories.filter(s => s.id == item.idCategory).length > 0
            ? this.categoriesStore.categories.filter(s => s.id == item.idCategory).pop().name : ""
          
        })
      },
        (error: AppError) => {
          if (error instanceof BadRequestError)
            this.toastr.error("That's an error", "Bad Request")
          else this.toastr.error("An unexpected error occurred.")
        });
  }

  async getProductsSaleOffForClientPage(filterParams: FilterParamsProduct) {
    await this.productService.getProductsSaleOffForClientPage(filterParams)
      .subscribe(res => {
        this.products = res.data;
        this.totalData = res.totalData;
        this.products.forEach(item => {
          item.category = this.categoriesStore.categories.filter(s => s.id == item.idCategory).length > 0
            ? this.categoriesStore.categories.filter(s => s.id == item.idCategory).pop().name : ""
            
          item.imageUrl = "assets/product.jpg"
          this.productService.getImagesByIdProduct(item.id).subscribe(res => {
            if (res.length != 0) {
              if (res[0].url) {
                item.imageUrl = res[0].url 
              }
            }
          })
        })
      },
        (error: AppError) => {
          if (error instanceof BadRequestError)
            this.toastr.error("That's an error", "Bad Request")
          else this.toastr.error("An unexpected error occurred.")
        });
  }

  
}
