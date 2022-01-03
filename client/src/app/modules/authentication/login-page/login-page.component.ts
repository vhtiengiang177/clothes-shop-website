import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthAppService } from 'src/app/services/auth/auth.service';
import { CartsStoreService } from 'src/app/services/store/carts-store/carts-store.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  invalidLogin: boolean;
  email: string;
  passwordVisibility: boolean = false
  
  constructor(private authService: AuthAppService, 
    private router: Router,
    private route: ActivatedRoute, 
    private toastr: ToastrService,
    private cartStore: CartsStoreService) { 
      this.email = history.state.email;
    }

  ngOnInit() {
  }

  login(form) {
    if (form.valid) {
      this.authService.login(form.value).subscribe(res => {
        if (res.isVerify) {
          this.fetchCart()
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        }
        else {
          let idAccount = res.id
          let account = form.value
          this.router.navigate(['/verification'], {state: { idAccount, account }});
        }
      }, (error: HttpErrorResponse) => {
        this.toastr.error(error.error);
      });
    }
  }

  fetchCart() {
    this.cartStore.get()
  }

  socialSignIn() {
    this.authService.signInWithGoogle()
  }
}
