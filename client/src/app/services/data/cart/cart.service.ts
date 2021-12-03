import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { Cart } from '../../model/cart/cart.model';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService extends DataService {

  constructor(http: HttpClient) {
    super("/carts", http)
   }

   getAllItemsInCart() {
     return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllItemsInCart", {
       headers: this.authorizationHeader()
     })
   }

   deleteItemsInCart(lItems: Cart[]) {
     return this.http.post(GlobalConstants.apiUrl + this.routeAPI, lItems,{
       headers: this.authorizationHeader()
     })
   }

   updateQuantityItemInCart(item: Cart) {
    return this.http.put<any>(GlobalConstants.apiUrl + this.routeAPI + "/UpdateQuantityItemInCart", item, {
      headers: this.authorizationHeader()
    })
   }
}
