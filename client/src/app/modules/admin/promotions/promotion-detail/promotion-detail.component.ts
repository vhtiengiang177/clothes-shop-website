import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { PromotionForm } from 'src/app/services/model/promotion/promotion-form.model';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';
import { FormControl, FormGroup } from '@angular/forms';
import { StaffForm } from 'src/app/services/model/staff/staff-form.model';
import { Image } from 'src/app/services/model/product/image.model';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';
import { Order } from 'src/app/services/model/order/order.model';

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.css']
})
export class PromotionDetailComponent implements OnInit {

 
  constructor(public dialogRef: MatDialogRef<PromotionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PromotionForm,
    private promotionsStore: PromotionsStoreService,
    public dialog: MatDialog,
    private staffStore:StaffStoreService,
    private toastr: ToastrService) {

      this.staffStore.staff$.subscribe(res => {
        if(res.length == 0) {
          this.staffStore.getAllStaff()
        }
        else {
          this.getNameStaff()
        }
      })

     }

  ngOnInit() {
  }

  getNameStaff() {
    this.data.promotion.staffCreate = this.staffStore.staff.filter(x => x.idAccount ==  this.data.promotion.createdById)[0].firstName
    this.data.promotion.staffModify = this.staffStore.staff.filter(x => x.idAccount ==  this.data.promotion.modifiedById)[0].firstName
  }

}
