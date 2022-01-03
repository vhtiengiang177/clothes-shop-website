import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthAppService } from 'src/app/services/auth/auth.service';
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
  clickProfile: boolean = false
  clickAddress: boolean = false
  clickChangePass: boolean = false

  constructor(private route: ActivatedRoute,
    private authService: AuthAppService, 
    private accountService: AccountService,
    private sharedService: SharedService) { 
    let path = route.snapshot.children[0].routeConfig.path
    if (path == 'delivery-address') 
      this.clickAddressItem()
    else if (path == 'change-password')
      this.clickChangePassItem()
    else this.clickProfileItem()
     
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
  
  clickProfileItem() {
    this.clickProfile = true

    this.clickAddress = false
    this.clickChangePass = false
  }

  clickAddressItem() {
    this.clickAddress = true

    this.clickProfile = false
    this.clickChangePass = false
  }

  clickChangePassItem() {
    this.clickChangePass = true

    this.clickProfile = false
    this.clickAddress = false
  }
}
