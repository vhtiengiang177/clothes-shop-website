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
}
