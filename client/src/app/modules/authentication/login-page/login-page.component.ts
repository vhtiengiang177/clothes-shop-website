import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VerifyResponse } from 'src/app/services/model/account/verify-response.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  invalidLogin: boolean;
  email: string;
  passwordVisibility: boolean = false
  
  constructor(private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute, 
    private toastr: ToastrService) { 
      this.email = history.state.email;
    }

  ngOnInit() {
  }

  login(form) {
    // if(form.valid) {
    //   this.authService.isVerificationAccount(form.value).subscribe(res => {
    //     if (res.isVerify) {
    //       this.authService.login(form.value).subscribe(res => {
    //         if (res) {
    //           let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    //           this.router.navigate([returnUrl || '/']);
    //         }
    //         else this.invalidLogin = true;
    //       }, (error: HttpErrorResponse) => {
    //         this.toastr.error(error.error);
    //       });
    //     }
    //     else {
    //       let idaccount = res.id
    //       let account = form.value
    //       this.router.navigate(['/verification'], {state: { idaccount, account }});
    //     }
    //   }, (error: HttpErrorResponse) => {
    //     this.toastr.error(error.error)
    //   })
    // }

    if (form.valid) {
      this.authService.login(form.value).subscribe(res => {
        if (res.isVerify) {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        }
        else {
          let idAccount = res.id
          let account = form.value
          this.router.navigate(['/verification'], {state: { idAccount, account }});
        }
      }, (error: HttpErrorResponse) => {
        console.log(error);
        
        this.toastr.error(error.error);
      });
    }
  }

}
