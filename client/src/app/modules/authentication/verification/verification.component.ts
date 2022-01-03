import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthAppService } from 'src/app/services/auth/auth.service';
import { Account } from 'src/app/services/model/account/account.model';
import { AccountsStoreService } from 'src/app/services/store/accounts-store/accounts-store.service';
import { CartsStoreService } from 'src/app/services/store/carts-store/carts-store.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  idAccount: number
  account: Account
  code: number
  countResendCodeRequest: number = 0
  messageError: string = ""
  today = formatDate(new Date(), 'dd/MM/yyyy', 'en')

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private authService: AuthAppService,
    private toastr: ToastrService,
    private cartStore: CartsStoreService) { 

      this.account = history.state.account
      if(this.account == null) {
        this.router.navigate(['/not-found'])
      }
      
      this.idAccount = history.state.idAccount
      this.account.id = this.idAccount

      let check = localStorage.getItem(this.account.email)
      if (check && check != this.today) {
        localStorage.removeItem(this.account.email)
      }
      else if (check && check == this.today) {
        this.messageError = "You've exceeded the number of verification attempts allowed within 24 hours"
      }
  }

  ngOnInit() {
  }

  clickVerify() {
    if(this.code) {
      this.authService.verifyAccount(this.code, this.idAccount).subscribe(res => {
        if (res) {
          this.fetchCart()
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/'])
        }
      }, (error: HttpErrorResponse) => {
        this.toastr.error(error.error)
      })
    }
  }

  fetchCart() {
    this.cartStore.get()
  }

  clickResendCode() {
    let currentUser = this.authService.getCurrentUser()
    if (currentUser.id != null) {
      this.router.navigate(['']);
    }
    let check = localStorage.getItem(this.account.email)
    this.countResendCodeRequest += 1
    if (!check || check != this.today) {
      if (!check && this.countResendCodeRequest > 3) {
        localStorage.setItem(this.account.email, this.today)
        this.messageError = "You've exceeded the number of verification attempts allowed within 1 day"
        return
      }
      else {
        this.authService.resendVerificationCode(this.account.id).subscribe(res => {
          this.toastr.success(res)
        })
      }
    }
    else this.messageError = "You've exceeded the number of verification attempts allowed within 1 day"
  }
}
