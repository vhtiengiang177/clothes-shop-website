
import { Favorite } from './../../model/favorite/favorite.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { AddressApiService } from '../../data/address-api/address-api.service';
import { DeliveryAddressService } from '../../data/delivery-address/delivery-address.service';
import { DeliveryAddress } from '../../model/customer/delivery-address.model';
import { FavoriteService } from '../../data/favorite/favorite.service';

@Injectable({
  providedIn: 'root'
})

export class FavoriteStoreService {
  private readonly _favorites = new BehaviorSubject<Favorite[]>([]);
  readonly favorites$ = this._favorites.asObservable();

  private readonly _totalData = new BehaviorSubject<number>(0);
  readonly totalData$ = this._totalData.asObservable();

  constructor(private favoriteService: FavoriteService, 
    private toastr: ToastrService) {
      if (this.favorites.length == 0) {
        this.getAllItemsInFavorite();
      }
   }

  get favorites() : Favorite[] {
    return this._favorites.value;
  }

  set favorites(val: Favorite[]) {
    this._favorites.next(val);
  }

  get totalData(): number {
    return this._totalData.getValue();
  }

  set totalData(val: number) {
    this._totalData.next(val);
  }

  create(favorite) {
    return this.favoriteService.create("/createdeliveryaddress", favorite)
  }

  async getAllItemsInFavorite() {
    await this.favoriteService.getAllItemsInFavorite()
      .subscribe(res => {
        this.favorites = res.data;
        this.totalData = res.length;
      })
  }



 
 
}
