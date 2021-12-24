import { Component, OnInit, Output, ViewEncapsulation,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AccountService } from 'src/app/services/data/account/account.service';
import { Customer } from 'src/app/services/model/customer/customer.model';
import { Staff } from 'src/app/services/model/staff/staff.model';
import { SharedService } from 'src/app/_shared/constant/share-service';

@Component({
  selector: 'app-orders-history-page',
  templateUrl: './orders-history-page.component.html',
  styleUrls: ['./orders-history-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersHistoryPageComponent implements OnInit {
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
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
    private authService: AuthService, 
    private accountService: AccountService,
    private sharedService: SharedService) { 
     
  }

  ngOnInit() {
    
  }
  
 
}