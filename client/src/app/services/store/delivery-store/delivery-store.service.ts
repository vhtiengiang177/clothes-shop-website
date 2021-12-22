
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { AddressApiService } from '../../data/address-api/address-api.service';
import { DeliveryAddressService } from '../../data/delivery-address/delivery-address.service';
import { DeliveryAddress } from '../../model/customer/delivery-address.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryStoreService {
  private readonly _deliveryaddress = new BehaviorSubject<DeliveryAddress[]>([]);

  readonly deliveryaddress$ = this._deliveryaddress.asObservable();

  constructor(private deliveryAddressService: DeliveryAddressService, 
    private toastr: ToastrService,
    private addressAPI: AddressApiService) {
   }

  get deliveryaddress() : DeliveryAddress[] {
    return this._deliveryaddress.value;
  }

  set deliveryaddress(val: DeliveryAddress[]) {
    this._deliveryaddress.next(val);
  }

  create(deliveryAddress) {
    return this.deliveryAddressService.create("/createdeliveryaddress", deliveryAddress)
  }

  async getAllDeliveryAddress() {
    await this.deliveryAddressService.getAllDeliveryAddress()
      .subscribe(res => {
        this.deliveryaddress = res
        this.deliveryaddress.forEach(item => {
          this.addressAPI.getProvince().subscribe(res => {
            item.province = res.data.find(obj => obj.ProvinceID === item.provinceId).ProvinceName
          })
          this.addressAPI.getDistrict(item.provinceId).subscribe(res => {
            item.district = res.data.find(obj => obj.DistrictID === item.districtId).DistrictName
          })
          this.addressAPI.getWard(item.districtId).subscribe(res => {
            item.ward = res.data.find(obj => obj.WardCode === item.wardCode).WardName
          })
        })
        console.log(this.deliveryaddress);
        
      });
  }

  createDelivery(deliveryaddressObj) {
    let result = new Subject<DeliveryAddress>();
    this.deliveryAddressService.create("/createdeliveryaddress", deliveryaddressObj).subscribe(res => {
      result.next(res)
      this.toastr.success("Added successfully")
    }, (error: AppError) => {
      if (error instanceof BadRequestError)
        return this.toastr.error("Add delivery address failed")
    })
    return result.asObservable()
  }

  update(deliveryaddressObj) {
    return this.deliveryAddressService.update("/UpdateDeliveryAddress", deliveryaddressObj.id, deliveryaddressObj)
  }

  getById(id) {
    return this.deliveryAddressService.getById("/GetDeliveryAddressByID", id)
  }

  delete(id) {
    return this.deliveryAddressService.delete(id)
  }
  
}
