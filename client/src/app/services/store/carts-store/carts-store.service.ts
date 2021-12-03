import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { CartService } from '../../data/cart/cart.service';
import { ProductService } from '../../data/product/product.service';
import { Cart } from '../../model/cart/cart.model';
import { ProductSizeColor } from '../../model/product/product-size-color.model';
import { ProductSizeColorsStoreService } from '../product-size-colors-store/product-size-colors-store.service';
import { ProductsStoreService } from '../products-store/products-store.service';

@Injectable({
  providedIn: 'root'
})
export class CartsStoreService {
  private readonly _carts = new BehaviorSubject<Cart[]>([]);

  readonly carts$ = this._carts.asObservable();
  toastr: any;

  constructor(private cartService: CartService, 
    private productsStore: ProductsStoreService,
    private productSizeColorsStore: ProductSizeColorsStoreService) {
    if (this.carts.length == 0) {
      this.get()
    }
   }

  get carts() : Cart[] {
    return this._carts.value;
  }

  set carts(val: Cart[]) {
    this._carts.next(val);
  }

  async get(){
    await this.cartService.getAllItemsInCart()
            .subscribe(res => {
              this.carts = res.data
              console.log(this.carts);
              
            });
  }

  add(cartObj) {
    let result = new Subject<Cart>();
    this.cartService.create("/AddItemToCart", cartObj).subscribe(res => {
      result.next(res)
      this.toastr.success("Added successfully", "Product #" )
    }, (error: AppError) => {
      if (error instanceof BadRequestError)
        return this.toastr.error("Add product failed")
      else this.toastr.error("An unexpected error occurred.", "Add Product To Cart")
    })
    return result.asObservable()
  }
}
