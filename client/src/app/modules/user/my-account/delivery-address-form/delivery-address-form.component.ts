import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { PromotionForm } from 'src/app/services/model/promotion/promotion-form.model';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DeliveryStoreService } from 'src/app/services/store/delivery-store/delivery-store.service';
import { DeliveryAddressForm } from 'src/app/services/model/delivery/delivery-address-form.model';
import { loadavg } from 'os';

@Component({
  selector: 'app-delivery-address-form',
  templateUrl: './delivery-address-form.component.html',
  styleUrls: ['./delivery-address-form.component.css']
})
export class DeliveryAddressFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeliveryAddressFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeliveryAddressForm,
    private deliveryStore: DeliveryStoreService,
    public dialog: MatDialog,
    private toastr: ToastrService) {
      console.log(data);
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
    if(!this.data.deliveryaddress.phone || !this.data.deliveryaddress.address || !this.data.deliveryaddress.province || !this.data.deliveryaddress.district
      || !this.data.deliveryaddress.wards) {
      this.toastr.error("Please fill in all the required fields.")
      return false
    }
    return true
  }

}
