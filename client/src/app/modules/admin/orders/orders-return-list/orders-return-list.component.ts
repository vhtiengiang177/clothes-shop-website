import { Staff } from 'src/app/services/model/staff/staff.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent, SELECT_ITEM_HEIGHT_EM } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { OrdersReturnStoreService } from 'src/app/services/store/orders-return-store/orders-return-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';
import { Order } from 'src/app/services/model/order/order.model';
import { FilterParamsOrders } from 'src/app/services/model/order/filter-params-orders.model';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';
import { OrdersProcessingStoreService } from 'src/app/services/store/orders-processing-store/orders-processing-store.service';
import { OrderService } from 'src/app/services/data/order/order.service';
import { DeliveryStoreService } from 'src/app/services/store/delivery-store/delivery-store.service';
import { ProductSizeColorsStoreService } from 'src/app/services/store/product-size-colors-store/product-size-colors-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';
import { OrderDetailStoreService } from 'src/app/services/store/order-detail-store/order-detail-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { CustomersStoreService } from 'src/app/services/store/customers-store/customers-store.service';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { OrdersDetailFormComponent } from '../orders-detail-form/orders-detail-form/orders-detail-form.component';


@Component({
  selector: 'app-orders-return-list',
  templateUrl: './orders-return-list.component.html',
  styleUrls: ['./orders-return-list.component.css']
})
export class OrdersReturnListComponent implements OnInit {
  @Input() set returnListEvent(value: boolean) {
    this.fetchData()
  }
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  filter: FilterParamsOrders = {
    pageindex: 1,
    pagesize: 5,
    idState: 7,
    sort: null
  };

  staff: Staff = {}

  constructor(private ordersReturnStore: OrdersReturnStoreService, public dialog: MatDialog,
    private staffStore:StaffStoreService,
    private orderDetailStore: OrderDetailStoreService,
    private productsStore: ProductsStoreService,
    private customerStore: CustomersStoreService,
    private colorsStore: ColorsStoreService,
    private sizesStore: SizesStoreService,
    private productSizeColorsStore: ProductSizeColorsStoreService,
    private promotionsStore: PromotionsStoreService,
    private deliveryStore: DeliveryStoreService,
    private orderService: OrderService,
    private orderStore: OrdersProcessingStoreService,
    private toastr: ToastrService) {

      this.ordersReturnStore.orders$.subscribe(res => {
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
    this.ordersReturnStore.getAll(this.filter);
  }

  reloadOrder() {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      idState: 7,
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
      idState: 7,
      content: content
    }
    this.paginator.pageIndex = 0;

    this.fetchData()
  }

  sortID() {
    if(this.ordersReturnStore.totalData !== 0) {
      if(this.filter.sort != 'id:asc') {
        this.filter.sort = 'id:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortIdShipper() {
    if(this.ordersReturnStore.totalData !== 0) {
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
    if(this.ordersReturnStore.totalData !== 0) {
      if(this.filter.sort != 'idemployee:asc') {
        this.filter.sort = 'idemployee:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortDateOrders() {
    if(this.ordersReturnStore.totalData !== 0) {
      if(this.filter.sort != 'dateorder:asc') {
        this.filter.sort = 'dateorder:asc';
      }
      else {
        this.filter.sort = 'dateorder:desc';
      }
      this.fetchData()
    }
  }
  sortDatePayment() {
    if(this.ordersReturnStore.totalData !== 0) {
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
    if(this.ordersReturnStore.totalData !== 0) {
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
    this.ordersReturnStore.orders.forEach((item:Order) => {
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
