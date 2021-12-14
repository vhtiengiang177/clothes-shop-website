import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { PromotionForm } from 'src/app/services/model/promotion/promotion-form.model';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DeliveryStoreService } from 'src/app/services/store/delivery-store/delivery-store.service';
import { DeliveryAddressForm } from 'src/app/services/model/delivery/delivery-address-form.model';
import { AddressApiService } from 'src/app/services/data/address-api/address-api.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-delivery-address-form',
  templateUrl: './delivery-address-form.component.html',
  styleUrls: ['./delivery-address-form.component.css']
})
export class DeliveryAddressFormComponent implements OnInit {
  dataProvinces = new BehaviorSubject<[]>([])
  dataDistricts = new BehaviorSubject<[]>([])
  dataWards = new BehaviorSubject<[]>([])

  constructor(public dialogRef: MatDialogRef<DeliveryAddressFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeliveryAddressForm,
    private deliveryStore: DeliveryStoreService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private addressAPI: AddressApiService) {
      this.addressAPI.getProvice().subscribe(res => {
        if (res){
          this.dataProvinces.next(res.data)
        }
      })
      this.checkDataAddress()
     }

  ngOnInit() {
  }

  save() {
    if (this.checkValidate()) {
      if (this.data.typeform === 0) {
        this.deliveryStore.createDelivery(this.data.deliveryaddress).subscribe(res => {
          this.dialogRef.close(res);
        }, (error:HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("It looks like something went wrong")
          }
        })
      }
      else if (this.data.typeform === 1) {
        this.deliveryStore.update(this.data.deliveryaddress).subscribe(res => {
          this.dialogRef.close(res)
        }, (error:HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("It looks like something went wrong")
          }
        })
      }
      else this.toastr.warning("It looks like something went wrong")
    }
  }

  checkValidate() {
    if(!this.data.deliveryaddress.phone || !this.data.deliveryaddress.address || !this.data.deliveryaddress.provinceId || !this.data.deliveryaddress.districtId
      || !this.data.deliveryaddress.wardCode) {
      this.toastr.error("Please fill in all the required fields.")
      return false
    }
    return true
  }

  checkDataAddress() {
    if (this.data.deliveryaddress.provinceId) {
      this.addressAPI.getDistrict(this.data.deliveryaddress.provinceId).subscribe(res => {
        this.dataDistricts.next(res.data)
      })
    }
    if (this.data.deliveryaddress.districtId) {
      this.addressAPI.getWard(this.data.deliveryaddress.districtId).subscribe(res => {
        this.dataWards.next(res.data)
      })
    }
  }

  selectedProvices(selected) {
    this.data.deliveryaddress.provinceId = selected.ProvinceID
    this.addressAPI.getDistrict(selected.ProvinceID).subscribe(res => {
      this.dataDistricts.next(res.data)
    })
  }

  selectedDistricts(selected) {
    this.data.deliveryaddress.districtId = selected.DistrictID
    this.addressAPI.getWard(selected.DistrictID).subscribe(res => {
      this.dataWards.next(res.data)
    })
  }

  selectedWards(selected) {
    this.data.deliveryaddress.wardCode = selected.WardCode
  }

  compareSelected(c1, c2) {
    return c1 && c2 && c1 === c2;
  }

}
