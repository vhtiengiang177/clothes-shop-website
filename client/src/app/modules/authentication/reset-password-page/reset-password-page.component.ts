import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthAppService } from 'src/app/services/auth/auth.service';
import { Account } from 'src/app/services/model/account/account.model';
import { AccountsStoreService } from 'src/app/services/store/accounts-store/accounts-store.service';
import { passwordValidator } from 'src/app/_shared/validator/password.validator';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {
  email: string = ""
  form: FormGroup;
  account: Account
  isMatchPassword: boolean

  constructor(private authService: AuthAppService, 
    private router: Router,
    private toastr: ToastrService,
    formBuilder: FormBuilder,
    private accountStore: AccountsStoreService) {
    this.email = history.state.email;
    this.form = formBuilder.group(
      {
        resetCode: [undefined, [Validators.required]],
        password: [undefined, [passwordValidator]],
        confirmPassword: [undefined, [Validators.required]]
      }
    );

    this.accountStore.getByEmail(this.email).subscribe(res => {
      this.account = res
    }, (error) => {
      this.router.navigate(['/not-found'])
    })
   }

  ngOnInit() {
  }

  resetPassword(form) {
    if(form.valid && this.isMatchPassword) {
      let params = {
        email: this.email,
        resetCode: form.get('resetCode').value,
        password: form.get('password').value
      }
      this.authService.resetPassword(params).subscribe(() => {
        this.toastr.success("Reset password successfully!")
        this.router.navigate(["/login"])
      }, (e: HttpErrorResponse) => {
        if (e.status == 400)
          this.toastr.error(e.error)
        else if (e.status == 404) {
          this.router.navigate(["/not-found"])
        }
      })
    }
    else this.toastr.error("Please fill out all fields")
  }

  matchPassword(password, confirmPassword) {
    if (password != confirmPassword)
       this.isMatchPassword = false
    else this.isMatchPassword = true
  }
}
