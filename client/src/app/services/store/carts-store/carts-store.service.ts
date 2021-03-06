import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { AuthAppService } from '../../auth/auth.service';
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

  private readonly _totalData = new BehaviorSubject<number>(0);
  readonly totalData$ = this._totalData.asObservable();

  constructor(private cartService: CartService, 
    private productsStore: ProductsStoreService,
    private productSizeColorsStore: ProductSizeColorsStoreService,
    private authService : AuthAppService,
    private toastr: ToastrService) {
    if ((this.carts.length == 0) && ((authService.isLoggedIn()))) {
      this.get()
    }
   }

  get carts() : Cart[] {
    return this._carts.value;
  }

  set carts(val: Cart[]) {
    this._carts.next(val);
  }

  get totalData(): number {
    return this._totalData.getValue();
  }

  set totalData(val: number) {
    this._totalData.next(val);
  }

  async get(){
    await this.cartService.getAllItemsInCart()
            .subscribe(res => {
              this.carts = res.data
              this.totalData = res.totalData
              console.log(this.carts);
              
            });
  }

  deleteItemsInCart(lItems) {
    return this.cartService.deleteItemsInCart(lItems)
  }

  updateQuantityItemInCart(item) {
    return this.cartService.updateQuantityItemInCart(item)
  }

  add(cartObj) {
    let result = new Subject<Cart>();
    this.cartService.create("/AddItemToCart", cartObj).subscribe(res => {
      result.next(res)
    }, (error: HttpErrorResponse) => {
      if (error.status === 400)
        this.toastr.error(error.error)
    })
    return result.asObservable()
  }
}
