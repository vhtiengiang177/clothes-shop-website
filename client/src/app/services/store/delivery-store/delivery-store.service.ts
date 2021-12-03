import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeliveryAddressService } from '../../data/delivery-address/delivery-address.service';
import { DeliveryAddress } from '../../model/customer/delivery-address.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryStoreService {
  private readonly _deliveryaddress = new BehaviorSubject<DeliveryAddress[]>([]);

  readonly deliveryaddress$ = this._deliveryaddress.asObservable();

  constructor(private deliveryAddressService: DeliveryAddressService) {
   }

  get deliveryaddress() : DeliveryAddress[] {
    return this._deliveryaddress.value;
  }

  set deliveryaddress(val: DeliveryAddress[]) {
    this._deliveryaddress.next(val);
  }

  create(deliveryAddress) {
    return this.deliveryAddressService.create("", deliveryAddress)
  }
}
