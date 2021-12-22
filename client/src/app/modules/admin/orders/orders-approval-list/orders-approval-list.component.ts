import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, ViewChild,Output } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FilterParamsOrders } from 'src/app/services/model/order/filter-params-orders.model';
import { Order } from 'src/app/services/model/order/order.model';
import { Staff } from 'src/app/services/model/staff/staff.model';
import { OrdersApprovalStoreService } from 'src/app/services/store/orders-approval-store/orders-approval-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';
import { OrdersDetailFormComponent } from '../orders-detail-form/orders-detail-form/orders-detail-form.component';


@Component({
  selector: 'app-orders-approval-list',
  templateUrl: './orders-approval-list.component.html',
  styleUrls: ['./orders-approval-list.component.css']
})
export class OrdersApprovalListComponent implements OnInit {
  @Output('pickup-event') pickupEvent = new EventEmitter();
  @Output('cancel-event') cancelEvent = new EventEmitter();
  @Input() set processListEvent(value: boolean) {
    this.fetchData()
  }
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  filter: FilterParamsOrders = {
    pageindex: 1,
    pagesize: 5,
    idState: 2,
    sort: null
  };

  staff: Staff = {}

  constructor(private ordersApprovalStore: OrdersApprovalStoreService, public dialog: MatDialog,
    private authService : AuthService,
    private staffStore: StaffStoreService,
    private toastr: ToastrService) { 
      this.staffStore.staff$.subscribe(res => {
        if(res.length == 0) {
          this.staffStore.getAllStaff()
        }
        else {
          this.ordersApprovalStore.orders$.subscribe(res => {
            if (res) {
              this.getNameStaff()
            }
          })
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
    this.ordersApprovalStore.getAll(this.filter);
  }

  reloadOrderApproval() {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      idState: 2,
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
      idState: 2,
      content: content
    }
    this.paginator.pageIndex = 0;

    this.fetchData()
  }

  sortIDApproval() {
    if(this.ordersApprovalStore.totalData !== 0) {
      if(this.filter.sort != 'id:asc') {
        this.filter.sort = 'id:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortDateOrdersApproval() {
    if(this.ordersApprovalStore.totalData !== 0) {
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
    if(this.ordersApprovalStore.totalData !== 0) {
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
    if(this.ordersApprovalStore.totalData !== 0) {
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
    if(this.ordersApprovalStore.totalData !== 0) {
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
    if(this.ordersApprovalStore.totalData !== 0) {
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
    this.ordersApprovalStore.orders.forEach((item:Order) => {
        item.shipper = this.staffStore.staff.filter(x => x.idAccount == item.idShipper)[0].firstName
        item.staff = this.staffStore.staff.filter(x => x.idAccount == item.idStaff)[0].firstName
        
    }) 
  }
  
  cancelOrder(idOrder) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to cancel the order",
        id: idOrder
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.ordersApprovalStore.updateState(idOrder,6).subscribe(() => {
          this.toastr.success("Cancel order #" + idOrder + " successfully")
          let totalStore = this.ordersApprovalStore.orders.length;
          if(totalStore == 1) {
            this.filter.pageindex = this.filter.pageindex - 1;
            this.paginator.pageIndex = this.filter.pageindex - 1;
          }
          this.fetchData()
          this.cancelEvent.emit();
        }, (error: HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("Bad Request")
          }
          else if (error.status == 404) {
            this.toastr.error("Not found order #" + idOrder)
          }
        })
      }
    });
  }

  pickUpOrder(idOrder) {
    this.ordersApprovalStore.updateState(idOrder,3).subscribe(() => {
      this.toastr.success("Pick up order #" + idOrder + " successfully")
      let totalStore = this.ordersApprovalStore.orders.length;
      if(totalStore == 1) {
        this.filter.pageindex = this.filter.pageindex - 1;
        this.paginator.pageIndex = this.filter.pageindex - 1;
      }
      this.fetchData()
      this.pickupEvent.emit();
    }, (error: HttpErrorResponse) => {
      if(error.status == 500) {
        this.toastr.error("Bad Request")
      }
      else if (error.status == 505) {
        this.toastr.error("Not found order #" + idOrder)
      }
    })
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
