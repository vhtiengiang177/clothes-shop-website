import { OrderDetail } from 'src/app/services/model/order/order-detail.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { FilterParamsOrders } from 'src/app/services/model/order/filter-params-orders.model';
import { Order } from 'src/app/services/model/order/order.model';
import { Staff } from 'src/app/services/model/staff/staff.model';
import { OrdersProcessingStoreService } from 'src/app/services/store/orders-processing-store/orders-processing-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';
import {MatTabsModule} from '@angular/material/tabs';
import { OrdersApprovalStoreService } from 'src/app/services/store/orders-approval-store/orders-approval-store.service';
import { OrdersDeliveryStoreService } from 'src/app/services/store/orders-Delivery-store/orders-Delivery-store.service';
import { OrdersCompletedStoreService } from 'src/app/services/store/orders-completed-store/orders-completed-store.service';
import { OrdersCancelledStoreService } from 'src/app/services/store/orders-cancelled-store/orders-cancelled-store.service';
import { OrdersReturnStoreService } from 'src/app/services/store/orders-return-store/orders-return-store.service';
import {  OrdersPickupStoreService } from 'src/app/services/store/orders-pickup-store/orders-pickup-store.service';
import { OrdersDetailFormComponent } from '../orders-detail-form/orders-detail-form/orders-detail-form.component';
import { OrderDetailStoreService } from 'src/app/services/store/order-detail-store/order-detail-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { CustomersStoreService } from 'src/app/services/store/customers-store/customers-store.service';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';
import { ProductSizeColorsStoreService } from 'src/app/services/store/product-size-colors-store/product-size-colors-store.service';
import { DeliveryStoreService } from 'src/app/services/store/delivery-store/delivery-store.service';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';
import { OrderService } from 'src/app/services/data/order/order.service';

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
    private toastr: ToastrService) { 

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
