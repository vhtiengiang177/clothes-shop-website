import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, throwError } from 'rxjs';
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

  private readonly _totalPage = new BehaviorSubject<number>(0);
  readonly totalPage$ = this._totalPage.asObservable();

  constructor(private productService: ProductService,
    private toastr: ToastrService) { }

  get products(): Product[] {
    return this._products.getValue();
  }

  set products(val: Product[]) {
    this._products.next(val);
  }

  get totalPage(): number {
    return this._totalPage.getValue();
  }

  set totalPage(val: number) {
    this._totalPage.next(val);
  }

  async getAll(filterParams: FilterParamsProduct) {
    await this.productService.get(filterParams)
              .subscribe(res => {
                this.products = res.data;
                this.totalPage = res.totalPage;
              } ,
              (error: AppError) => {
                if(error instanceof BadRequestError)
                  this.toastr.error("That's an error", "Bad Request")
                else throwError(error)
              });
  }
}
