import { passwordValidator } from 'src/app/_shared/validator/password.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { StaffForm } from 'src/app/services/model/staff/staff-form.model';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';


@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css']
})
export class StaffFormComponent implements OnInit {
  oldEmail: string = ""

  constructor(public dialogRef: MatDialogRef<StaffFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StaffForm,
    private staffStore: StaffStoreService,
    public dialog: MatDialog,
    private toastr: ToastrService) { 
      
    }

  ngOnInit() {
  }

  save() {
    if (this.checkValidate()) {
      if (this.data.typeform === 0) {
        this.staffStore.create(this.data.staff).subscribe(res => {
          this.dialogRef.close(res)
        }, (error:HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("It looks like something went wrong")
          }
        })
      }
      else if (this.data.typeform === 1) {
        this.staffStore.update(this.data.staff).subscribe(res => {
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
    if(  !this.data.staff.firstName || !this.data.staff.cardIdentity || !this.data.staff.phone
       || !this.data.staff.email) {
      this.toastr.error("Please fill in all the required fields.")
      return false
    }
    return true
  }

  compareSelected(c1, c2) {
    return c1 && c2 && c1 === c2.toString();
  }
}
