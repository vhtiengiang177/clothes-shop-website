import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AccountParams } from 'src/app/services/model/account/account-params.model';
import { emailValidator } from 'src/app/_shared/validator/email.validator';
import { passwordValidator } from 'src/app/_shared/validator/password.validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;
  isMatchPassword: boolean

  constructor(private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute, 
    private toastr: ToastrService,
    formBuilder: FormBuilder) { 
      this.form = formBuilder.group(
        {
          email: [undefined, [emailValidator]],
          lastName: [undefined],
          firstName: [undefined, [Validators.required]],
          password: [undefined, [passwordValidator]],
          confirmPassword: [undefined, [Validators.required]]
        }
      );
    }

  ngOnInit() {
  }

  register(form) {
    if(form.valid && form.get('firstName').value.trim() != "" && this.isMatchPassword) {
      console.log("Register");
      let account = {
        lastName: form.get('lastName').value,
        firstName: form.get('firstName').value,
        email: form.get('email').value,
        password: form.get('password').value
      }
      let email = account.email
      this.authService.register(account).subscribe(() => {
        this.toastr.success(account.email + " has been successfully created")
        this.router.navigate(['/login'], { state: { email }})
      }, (e: HttpErrorResponse) => {
        this.toastr.error(e.error)
      })
    }
  }

  matchPassword(password, confirmPassword) {
    if (password != confirmPassword)
       this.isMatchPassword = false
    else this.isMatchPassword = true
  }
}
