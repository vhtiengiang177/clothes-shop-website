import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Account } from 'src/app/services/model/account/account.model';
import { AccountsStoreService } from 'src/app/services/store/accounts-store/accounts-store.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  idaccount: number
  account: Account
  code: number

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private authService: AuthService,
    private toastr: ToastrService) { 
    this.idaccount = history.state.idaccount
    this.account = history.state.account
    this.account.id = this.idaccount

    if(this.account.email == "") {
      this.router.navigate(['/not-found'])
    }
  }

  ngOnInit() {
  }

  clickVerify() {
    if(this.code) {
      this.authService.verifyAccount(this.code, this.idaccount).subscribe(res => {
        if(res) {
          this.authService.login(this.account).subscribe(res => {
            if (res) {
              let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
              this.router.navigate([returnUrl || '/'])
            }
          }, (error: HttpErrorResponse) => {
            this.toastr.error(error.error)
          });
        }
        else this.toastr.error("Verification Code is wrong!")
      })
    }
  }

}
