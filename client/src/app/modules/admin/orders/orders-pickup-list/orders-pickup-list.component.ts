import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, EventEmitter,Output,Input } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { FilterParamsOrders } from 'src/app/services/model/order/filter-params-orders.model';
import { Order } from 'src/app/services/model/order/order.model';
import { Staff } from 'src/app/services/model/staff/staff.model';
import { OrdersProcessingStoreService } from 'src/app/services/store/orders-processing-store/orders-processing-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';
import {MatTabsModule} from '@angular/material/tabs';
import { OrdersDetailFormComponent } from '../orders-detail-form/orders-detail-form/orders-detail-form.component';
import { OrdersPickupStoreService } from 'src/app/services/store/orders-pickup-store/orders-pickup-store.service';
import { AuthAppService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-orders-pickup-list',
  templateUrl: './orders-pickup-list.component.html',
  styleUrls: ['./orders-pickup-list.component.css']
})
export class OrdersPickupListComponent implements OnInit {
  @Output('delivery-event') deliveryEvent = new EventEmitter();
  @Input() set approvalListEvent(value: boolean) {
    this.fetchData()
  }
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  filter: FilterParamsOrders = {
    pageindex: 1,
    pagesize: 10,
    idState:3,
    sort: null
  };

  staff: Staff = {}

  constructor(private ordersPickupStore: OrdersPickupStoreService, 
    public dialog: MatDialog,
    private staffStore: StaffStoreService,
    private toastr: ToastrService,
    private authService: AuthAppService) { 
      this.ordersPickupStore.orders$.subscribe(res => {
        if (res) {
          this.getNameStaff()
        }
      })

      this.fetchData()
    }

  ngOnInit() {
  }

  onPaginate(pageEvent: PageEvent) {
    this.filter.pagesize = +pageEvent.pageSize;
    this.filter.pageindex = +pageEvent.pageIndex + 1;
    this.fetchData()
  }
  
  fetchData() {
    this.ordersPickupStore.getAll(this.filter);
  }

  reloadOrder() {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      idState: 3,
      sort: this.filter.sort
    }
    this.paginator.pageIndex = 0;
    this.fetchData()
  }

  searchEvent(content) {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      sort: this.filter.sort,
      idState: 3,
      content: content
    }
    this.paginator.pageIndex = 0;

    this.fetchData()
  }

  sortID() {
    if(this.ordersPickupStore.totalData !== 0) {
      if(this.filter.sort != 'id:asc') {
        this.filter.sort = 'id:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortDateOrders() {
    if(this.ordersPickupStore.totalData !== 0) {
      if(this.filter.sort != 'dateorder:asc') {
        this.filter.sort = 'dateorder:asc';
      }
      else {
        this.filter.sort = 'dateorder:desc';
      }
      this.fetchData()
    }
  }

   sortIdShipper() {
    if(this.ordersPickupStore.totalData !== 0) {
      if(this.filter.sort != 'idshipper:asc') {
        this.filter.sort = 'idshipper:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortIdEmployee() {
    if(this.ordersPickupStore.totalData !== 0) {
      if(this.filter.sort != 'idemployee:asc') {
        this.filter.sort = 'idemployee:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortDatePayment() {
    if(this.ordersPickupStore.totalData !== 0) {
      if(this.filter.sort != 'datepayment:asc') {
        this.filter.sort = 'datepayment:asc';
      }
      else {
        this.filter.sort = 'datepayment:desc';
      }
      this.fetchData()
    }
  }

  sortDateShip() {
    if(this.ordersPickupStore.totalData !== 0) {
      if(this.filter.sort != 'dateship:asc') {
        this.filter.sort = 'dateship:asc';
      }
      else {
        this.filter.sort = 'dateship:desc';
      }
      this.fetchData()
    }
  }

  getNameStaff() {
    this.ordersPickupStore.orders.forEach((item:Order) => {
      if (item.idShipper != null) {
        this.staffStore.getById(item.idShipper).subscribe((res:Staff) => {
          item.shipper = res.idAccount + " - " + res.firstName
        })
      }
      if (item.idStaff != null) {
        this.staffStore.getById(item.idStaff).subscribe(res => {
          item.staff = res.idAccount + " - " + res.firstName
        })
      }
    }) 
  }

  cancelOrdePickUp(idOrder) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to cancel the order",
        id: idOrder
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.ordersPickupStore.updateState(idOrder,6).subscribe(() => {
          this.toastr.success("Cancel order #" + idOrder + " successfully")
          let totalStore = this.ordersPickupStore.orders.length;
          if(totalStore == 1) {
            this.filter.pageindex = this.filter.pageindex - 1;
            this.paginator.pageIndex = this.filter.pageindex - 1;
          }
          this.fetchData()
        }, (error: HttpErrorResponse) => {
          if(error.status == 500) {
            this.toastr.error("Bad Request")
          }
          else if (error.status == 505) {
            this.toastr.error("Not found order #" + idOrder)
          }
        })
      }
    });
  }

  deliveryOrder(order) {
    if (this.authService.getCurrentUser().id == order.idShipper) {
      this.ordersPickupStore.updateState(order.id, 4).subscribe(() => {
        this.toastr.success("Delivery order #" + order.id + " successfully")
        let totalStore = this.ordersPickupStore.orders.length;
        if(totalStore == 1) {
          this.filter.pageindex = this.filter.pageindex - 1;
          this.paginator.pageIndex = this.filter.pageindex - 1;
        }
        this.fetchData()
        this.deliveryEvent.emit();
      }, (error: HttpErrorResponse) => {
        if(error.status == 400) {
          this.toastr.error("Bad Request")
        }
        else if (error.status == 404) {
          this.toastr.error("Not found order #" + order.id)
        }
      })
    }
    else {
      this.toastr.warning("You cannot deliver this order")
    }
  }
 
  viewDetailOrder(idOrder) {
    const dialogRef = this.dialog.open(OrdersDetailFormComponent, {
      width: '900px',
      data: { 
       idOrder:idOrder
      }
    });
    
    dialogRef.afterClosed().subscribe(res => {
    
    });
  }
}
