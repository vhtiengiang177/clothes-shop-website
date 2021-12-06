import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AccountService } from 'src/app/services/data/account/account.service';
import { Customer } from 'src/app/services/model/customer/customer.model';
import { Staff } from 'src/app/services/model/staff/staff.model';
import { SharedService } from 'src/app/_shared/constant/share-service';

@Component({
  selector: 'app-my-account-page',
  templateUrl: './my-account-page.component.html',
  styleUrls: ['./my-account-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyAccountPageComponent implements OnInit {
  email: string
  customer: Customer = {}
  staff: Staff = {}
  typeaccount: number
  name: string
  imageUrl: string = null

  constructor(private authService: AuthService, 
    private accountService: AccountService,
    private sharedService: SharedService) { 
    this.typeaccount = authService.getCurrentUser().idTypeAccount
    accountService.getAccountInfo(authService.getCurrentUser().id).subscribe(res => {
      this.email = res.account.email
      if(this.typeaccount == 4) {
        this.customer = res
        this.name = this.customer.lastName + " " + this.customer.firstName
        this.imageUrl = this.customer.image
      }
      else {
        this.staff = res
        this.name = this.staff.lastName + " " + this.staff.firstName
        this.imageUrl = this.staff.image
      }
    })

    sharedService.changeEmitted$.subscribe(res => {
      this.imageUrl = res
    })
  }

  ngOnInit() {
  }
  

}
