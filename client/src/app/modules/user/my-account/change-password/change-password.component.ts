import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthAppService } from 'src/app/services/auth/auth.service';
import { AccountsStoreService } from 'src/app/services/store/accounts-store/accounts-store.service';
import { passwordValidator } from 'src/app/_shared/validator/password.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  isMatchPassword: boolean
  isNotDuplicatePassword: boolean
  oldPasswordVisibility: boolean = false
  newPasswordVisibility: boolean = false
  confirmPasswordVisibility: boolean = false

  constructor(private accountStore: AccountsStoreService,
    private toastr: ToastrService,
    formBuilder: FormBuilder,
    authService: AuthAppService) {
    if (authService.getCurrentUser().provider == "ACCOUNT") {
      this.form = formBuilder.group(
        {
          oldPassword: [undefined, [Validators.required]],
          newPassword: [undefined, [passwordValidator]],
          confirmPassword: [undefined, [Validators.required]]
        }
      );
    }
    else {
      this.form = formBuilder.group(
        {
          oldPassword: [""],
          newPassword: [undefined, [passwordValidator]],
          confirmPassword: [undefined, [Validators.required]]
        }
      );
    }
   }

  ngOnInit() {
  }

  changePassword(form) {
    if(form.valid && this.isMatchPassword && this.isNotDuplicatePassword) {
      let params = {
        oldPassword: form.get('oldPassword').value,
        newPassword: form.get('newPassword').value
      }
      this.accountStore.changePassword(params).subscribe(() => {
        this.toastr.success("Change password successfully!")
        form.get('oldPassword').value = ""
        form.get('newPassword').value = ""
        form.get('confirmPassword').value = ""
      }, (e: HttpErrorResponse) => {
        if (e.status == 400)
          this.toastr.error(e.error)
      })
    }
    else if (!this.isNotDuplicatePassword) {

    }
    else this.toastr.error("Please fill out all fields")
  }

  matchPassword(oldPassword, newPassword, confirmPassword) {
    if (newPassword != confirmPassword)
      this.isMatchPassword = false
    else this.isMatchPassword = true

    if (oldPassword == newPassword) {
      this.isNotDuplicatePassword = false
    }
    else this.isNotDuplicatePassword = true
  }

  matchOldAndNewPassword(oldPassword, newPassword) {
    if (newPassword != oldPassword)
       this.isMatchPassword = false
    else this.isMatchPassword = true
  }

}
