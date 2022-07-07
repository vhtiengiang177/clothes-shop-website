import { PromotionService } from './../../../../services/data/promotion/promotion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { PromotionForm } from 'src/app/services/model/promotion/promotion-form.model';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})



export class PromotionFormComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  hideSelect = new FormControl(false);
  typePromotion: Boolean
  mainBanner: Boolean
  messageErrorImage: string = ""
  fileToUploadUpdate: File
  oldImageUrl: string= "assets/No_image_available.png"
  loading: boolean = false
  imageUrl: string = "assets/No_image_available.png"

  constructor(public dialogRef: MatDialogRef<PromotionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PromotionForm,
    private promotionsStore: PromotionsStoreService,
    private promotionService: PromotionService,
    public dialog: MatDialog,
    private toastr: ToastrService) { 
      console.log(data);
      this.typePromotion = true 
      if (this.data.promotion.state !=2)
      {
        this.typePromotion = false
      }

      if (this.data.promotion.isMainBanner == 1){
        this.mainBanner = true
      }

      if(!this.data.promotion.startDate) {
        this.data.promotion.startDate = new Date();
      }
      if(!this.data.promotion.endDate) {
        this.data.promotion.endDate = new Date();
        this.data.promotion.endDate.setDate(this.data.promotion.endDate.getDate() + 1);
      }
      if (this.data.promotion.image){
        this.imageUrl = this.data.promotion.image;
      }
    }

  ngOnInit() {
  }

  save() {
    if (this.checkValidate()) {
      if (this.typePromotion == true) {
        this.data.promotion.state = 2
      }else{
        this.data.promotion.state = 3
      }

      if (this.mainBanner == true) {
        this.data.promotion.isMainBanner = 1
      }else{
        this.data.promotion.isMainBanner = 0
      }


      if (this.data.typeform === 0) {
        this.promotionsStore.create(this.data.promotion).subscribe(res => {
          if (this.oldImageUrl != this.imageUrl)
              this.updateImage()
          this.dialogRef.close(res);
        }, (error:HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("It looks like something went wrong")
          }
        })
      }
      else if (this.data.typeform === 1) {
        this.promotionsStore.update(this.data.promotion).subscribe(res => {
          if (this.oldImageUrl != this.imageUrl)
              this.updateImage()
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
    if(!this.data.promotion.name || !this.data.promotion.value || !this.data.promotion.startDate || !this.data.promotion.endDate) {
      this.toastr.error("Please fill in all the required fields.")
      return false
    }
    return true
  }

  checkStartDate() {
    if(this.data.promotion.startDate >= this.data.promotion.endDate) {
      this.toastr.warning("Start date < End date")
      this.data.promotion.startDate.setDate(this.data.promotion.endDate.getDate() - 1);
    }
  }

  checkEndDate() {
    if(this.data.promotion.startDate >= this.data.promotion.endDate) {
      this.data.promotion.endDate.setDate(this.data.promotion.startDate.getDate() + 1);
    }
  }

  public uploadFile = (files) => {
    if (files.length === 0)
      return
    let fileToUpload = <File>files[0];
    if (fileToUpload.type != "image/jpeg" && fileToUpload.type != "image/png") {
      this.messageErrorImage = "Invalid image file format"
      return
    }
    this.messageErrorImage = ""
    this.readFile(fileToUpload)
    this.fileToUploadUpdate = fileToUpload
  }

  readFile(fileToUpload) {
    var reader  = new FileReader()
    reader.onload = (event: Event) => {
      this.imageUrl = reader.result.toString()
    }
    reader.readAsDataURL(fileToUpload);
  }

  deleteImage() {
    this.imageUrl = this.oldImageUrl
    // SEND API DELETE IMAGE
  }

  updateImage() {
    console.log(this.fileToUploadUpdate);
    
    const formData = new FormData();
    formData.append('file', this.fileToUploadUpdate, this.fileToUploadUpdate.name);
    this.promotionService.addImagePromotion(formData,this.data.promotion.id).toPromise()
  }
}
