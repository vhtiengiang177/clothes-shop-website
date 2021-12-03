import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AccountParams } from 'src/app/services/model/account/account-params.model';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';

@Component({
  selector: 'app-staff-add-form',
  templateUrl: './staff-add-form.component.html',
  styleUrls: ['./staff-add-form.component.css']
})
export class StaffAddFormComponent implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<StaffAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountParams,
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

  // register(form) {
  //   if(form.valid && form.get('firstName').value.trim() != "" && this.isMatchPassword) {
  //     console.log("Register");
  //     let account = {
  //       lastName: form.get('lastName').value,
  //       firstName: form.get('firstName').value,
  //       email: form.get('email').value,
  //       password: form.get('password').value
  //     }
  //     let email = account.email
  //     this.authService.register(account).subscribe(() => {
  //       this.toastr.success(account.email + " has been successfully created")
  //       this.router.navigate(['/login'], { state: { email }})
  //     }, (e: HttpErrorResponse) => {
  //       this.toastr.error(e.error)
  //     })
  //   }
  // }

}  

