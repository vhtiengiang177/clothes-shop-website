import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { ProductService } from '../../data/product/product.service';
import { FilterParamsProduct } from '../../model/product/filter-params-product.model';
import { Image } from '../../model/product/image.model';
import { LogProduct } from '../../model/product/log-product.model';
import { Product } from '../../model/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsStoreService {

  private readonly _products = new BehaviorSubject<Product[]>([])
  readonly products$ = this._products.asObservable()

  private readonly _totalData = new BehaviorSubject<number>(0);
  readonly totalData$ = this._totalData.asObservable();

  constructor(private productService: ProductService,
    private toastr: ToastrService) {
    if (this.products.length == 0) {
      let filter: FilterParamsProduct = {};
      this.getAll(filter);
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
      },
        (error: AppError) => {
          if (error instanceof BadRequestError)
            this.toastr.error("That's an error", "Bad Request")
          else this.toastr.error("An unexpected error occurred.")
        })
      return result.asObservable()
  }

  getTopNewProducts() {
    let result = new Subject<Product[]>();
    this.productService.getTopNewProducts()
      .subscribe(res => {
        result.next(res)
      },
        (error: AppError) => {
          if (error instanceof BadRequestError)
            this.toastr.error("That's an error", "Bad Request")
          else this.toastr.error("An unexpected error occurred.")
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

  getImagesByIdProduct(idProduct) {
    let result = new Subject<Image[]>();
    this.productService.getImagesByIdProduct(idProduct).subscribe(res => {
      result.next(res)
    })

    return result.asObservable()
  }
}
