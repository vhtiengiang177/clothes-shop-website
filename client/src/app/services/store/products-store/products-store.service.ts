import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { ProductService } from '../../data/product/product.service';
import { FilterParamsProduct } from '../../model/product/filter-params-product.model';
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
      if(this.products.length == 0) {
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
              } ,
              (error: AppError) => {
                if(error instanceof BadRequestError)
                  this.toastr.error("That's an error", "Bad Request")
                else throw error
              });
  }
}
