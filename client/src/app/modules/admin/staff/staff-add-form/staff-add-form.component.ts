import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AccountParams } from 'src/app/services/model/account/account-params.model';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';
import { StaffForm } from 'src/app/services/model/staff/staff-form.model';

@Component({
  selector: 'app-staff-add-form',
  templateUrl: './staff-add-form.component.html',
  styleUrls: ['./staff-add-form.component.css']
})
export class StaffAddFormComponent implements OnInit {
  form: FormGroup;
  

  constructor(public dialogRef: MatDialogRef<StaffAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StaffForm,
    private staffStore: StaffStoreService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    formBuilder: FormBuilder) { 
      console.log(data);

      // this.form = formBuilder.group(
      //   {
      //     email: [undefined, [emailValidator]],
      //     lastName: [undefined],
      //     firstName: [undefined, [Validators.required]],
      //     password: [undefined, [passwordValidator]],
      //     confirmPassword: [undefined, [Validators.required]]
      //   }
    }

  ngOnInit() {
  }

  save() {
    if (this.checkValidate()) {
        this.staffStore.create(this.data.account,this.data.staff).subscribe(res => {
          this.dialogRef.close(res);
        }, (error:HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("It looks like something went wrong")
          }
        }) 
    }
    else this.toastr.warning("It looks like something went wrong")
  }

  checkValidate() {
    if(!this.data.staff.firstName || !this.data.staff.cardIdentity || !this.data.staff.phone || !this.data.account.email) {
      this.toastr.error("Please fill in all the required fields.")
      return false
    }
    return true
  }

}  

