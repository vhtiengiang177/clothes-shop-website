import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
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

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private authService: AuthService,
    private toastr: ToastrService,
    private cartStore: CartsStoreService) { 

      this.account = history.state.account
      if(this.account == null) {
        this.router.navigate(['/not-found'])
      }
      
      this.idAccount = history.state.idAccount
      this.account.id = this.idAccount
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
}
