import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
 
  isApprovalEvent: boolean
  isCancelledEvent: boolean
  isPickupEvent: boolean
  isDeliveryEvent: boolean
  isCompletedEvent: boolean
  isReturnEvent: boolean
 
  constructor(
    
    public dialog: MatDialog,
    private staffStore: StaffStoreService,
    private toastr: ToastrService,
    private authService : AuthService) { 

    }

  ngOnInit() {
  }
  
  approvalEvent(){
    this.isApprovalEvent = !this.isApprovalEvent
  }

  cancelledEvent(){
    this.isCancelledEvent = !this.isCancelledEvent
  }

  pickupEvent(){
    this.isPickupEvent = !this.isPickupEvent
  }

 deliveryEvent(){
    this.isDeliveryEvent = !this.isDeliveryEvent
  }

  completedEvent(){
    this.isCompletedEvent = !this.isCompletedEvent
  }

  returnEvent(){
    this.isReturnEvent = !this.isReturnEvent
  }


}
