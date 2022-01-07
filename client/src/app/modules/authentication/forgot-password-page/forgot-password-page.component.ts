import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthAppService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent implements OnInit {

  constructor(private authService: AuthAppService,
    private toastr: ToastrService, 
    private router: Router) { }

  ngOnInit() {
  }

  sendResetPassword(form) {
    if (form.valid) {
      var email = form.value.email;
      this.authService.sendEmailResetPassword(email).subscribe(() => {
        this.toastr.success("Please check your email")
        this.router.navigate(['/reset-password'], { state: { email }})
      }, (error: HttpErrorResponse) => {
        if (error.status == 400) {
          this.toastr.error(error.error)
        }
      })
    }
  }

}
