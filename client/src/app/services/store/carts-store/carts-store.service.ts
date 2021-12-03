import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  deleteItemsInCart(lItems) {
    return this.cartService.deleteItemsInCart(lItems)
  }

  updateQuantityItemInCart(item) {
    return this.cartService.updateQuantityItemInCart(item)
  }
}
