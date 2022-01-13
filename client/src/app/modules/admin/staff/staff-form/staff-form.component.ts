import { AccountParams } from 'src/app/services/model/account/account-params.model';
import { AccountsStoreService } from 'src/app/services/store/accounts-store/accounts-store.service';
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
  oldCard: string = ""
  oldPhone: string = ""


  constructor(public dialogRef: MatDialogRef<StaffFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StaffForm,
    private staffStore: StaffStoreService,
    private accountStore: AccountsStoreService,
    public dialog: MatDialog,
    private toastr: ToastrService) { 
      this.oldEmail = this.data.staff.email;
      this.oldCard = this.data.staff.cardIdentity;
      this.oldPhone = this.data.staff.phone;
    }

  ngOnInit() {
  }

  save() {
    if (this.checkValidate()) {
      if (this.data.typeform === 0) {
        this.oldEmail = this.data.staff.email
        this.oldCard = this.data.staff.cardIdentity
        this.oldPhone = this.data.staff.phone
      }
      
      var accountparams: AccountParams = {
        lastName: this.data.staff.lastName,
        FirstName: this.data.staff.firstName,
        phone:this.oldPhone,
        CardIdentity: this.oldCard, 
        dob: this.data.staff.dateOfBirth,
        email: this.oldEmail,
        IdTypeAccount: this.data.staff.typeStaff
      }

      if (this.data.typeform == 1 && this.oldEmail != this.data.staff.email) {
        accountparams.newEmail = this.data.staff.email
      }
      else accountparams.newEmail = ""

      if (this.data.typeform == 1 && this.oldCard != this.data.staff.cardIdentity) {
        accountparams.newCard = this.data.staff.cardIdentity
      }
      else accountparams.newCard = ""

      if (this.data.typeform == 1 && this.oldPhone != this.data.staff.phone) {
        accountparams.newPhone = this.data.staff.phone
      }
      else accountparams.newPhone = ""

      accountparams.typeForm = this.data.typeform

      this.accountStore.createAccount(accountparams).subscribe(()=>{
        this.toastr.success("Success")
        this.dialogRef.close()
      }, (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.toastr.error(error.error)
        }
      });
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
