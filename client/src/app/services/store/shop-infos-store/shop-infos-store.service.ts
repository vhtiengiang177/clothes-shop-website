import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShopInfoService } from '../../data/shop-info/shop-info.service';
import { ShopInfo } from '../../model/shop-info/shop-info.model';

@Injectable({
  providedIn: 'root'
})
export class ShopInfosStoreService {
  private readonly _shopinfos = new BehaviorSubject<ShopInfo[]>([]);

  readonly shopinfos$ = this._shopinfos.asObservable();

  constructor(private shopInfoService: ShopInfoService) {
    if (this.shopinfos.length == 0) {
      this.get()
    }
   }

  get shopinfos() : ShopInfo[] {
    return this._shopinfos.value;
  }

  set shopinfos (val: ShopInfo[]) {
    this._shopinfos.next(val);
  }

  async get(){
    await this.shopInfoService.get()
            .subscribe(res => this.shopinfos = res);
  }

  update(shopObj) {
    return this.shopInfoService.update("/UpdateShopInfo", shopObj.id, shopObj)
  }
}
