
import { Customer } from './../../../../services/model/customer/customer.model';
import { Order } from './../../../../services/model/order/order.model';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { Image } from 'src/app/services/model/product/image.model';
import { ProductSizeColor } from 'src/app/services/model/product/product-size-color.model';
import { Product } from 'src/app/services/model/product/product.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { DeliveryStoreService } from 'src/app/services/store/delivery-store/delivery-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';
import { CustomersStoreService } from 'src/app/services/store/customers-store/customers-store.service';
import { OrderDetailStoreService } from 'src/app/services/store/order-detail-store/order-detail-store.service';
import { OrdersProcessingStoreService } from 'src/app/services/store/orders-processing-store/orders-processing-store.service';
import { ProductSizeColorsStoreService } from 'src/app/services/store/product-size-colors-store/product-size-colors-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';


@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css']
})
export class OrdersDetailComponent implements OnInit {

  isVisible = false
  id: number
  order: Order
  address: string = ""
  promotion: string = ""
  customer: string =""
  shipper: string =""
  employee: string =""
  linkBack: string
  listImages: Image[]
  static readonly addForm = 0;
  static readonly importForm = 1;
  static readonly deleteForm = 2;

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private productsStore: ProductsStoreService,
    private customersStore: CustomersStoreService,
    private promotionsStore: PromotionsStoreService,
    private deliveryStore: DeliveryStoreService,
    private orderDetailStore: OrderDetailStoreService,
    private orderStore: OrdersProcessingStoreService,
    private customerStore: CustomersStoreService,
    private colorsStore: ColorsStoreService,
    private sizesStore: SizesStoreService,
    private staffStore: StaffStoreService,
    private productSizeColorsStore: ProductSizeColorsStoreService,
    private toastr: ToastrService) { 
      this.route.params.subscribe((param) => {
        this.id = param['id']
        this.orderStore.getById(param['id']).subscribe(res => {
          this.isVisible = true;
          this.order = res;
          if (this.order.state==1) {
            this.linkBack="/admin/orders-process"
          }
          if (this.order.state==2) {
            this.linkBack="/admin/orders-approval"
          }
          if (this.order.state==3) {
            this.linkBack="/admin/orders-delivery"
          }
          if (this.order.state==4) {
            this.linkBack="/admin/orders-completed"
          }
          if (this.order.state==5) {
            this.linkBack="/admin/orders-cancelled"
          }
          if (this.order.state==6) {
            this.linkBack="/admin/orders-return"
          }
         
         // this.order.customer = this.customerStore.customer.filter(s => s.id == this.order.IdCustomer).pop().firstName + this.customerStore.customer.filter(s => s.id == this.order.IdCustomer).pop().lastName
          this.fetchOrder()
          
          this.orderDetailStore.orderdetails$.subscribe(res => {
            if (res) {
              this.getNameEntity()
            }
          })

          this.customerStore.customer$.subscribe(res => {
            if(res) {
              this.customerStore.getCustomerById(this.order.idCustomer).subscribe(customer => {
                if (customer) {
                  this.customer =  customer.idAccount + " - " + customer.firstName + " "+ customer.lastName
                }
              })
            }
          })

          this.deliveryStore.deliveryaddress$.subscribe(res => {
            if(res) {
              this.deliveryStore.getById(this.order.idAddress).subscribe(address => {
                if (address) {
                  this.address =  address.address + ", " + address.wards + ", " + address.district + ", " + address.province + "."
                }
              })
            }
          })

          this.promotionsStore.promotions$.subscribe(res => {
            if(res) {
              this.promotionsStore.getById(this.order.idPromotion).subscribe(promotion => {
                if (promotion) {
                  this.promotion = promotion.name + " - " + (promotion.value * 100) + " % "
                }
              })
            }
          })

          this.staffStore.staff$.subscribe(res => {
            if(res.length == 0) {
              this.staffStore.getAllStaff()
            }
            else {
              this.getNameStaff(this.order.idShipper,this.order.idStaff)
            }
          })


        }, (error: HttpErrorResponse) => {
          if(error.status == 404) {
            this.router.navigate(['admin/not-found'])
          }
        })
      })
    }

  ngOnInit() {
  }

  
  fetchOrder() {
    this.orderDetailStore.get(this.id)
  }

  getNameEntity() {
    this.orderDetailStore.orderdetails.forEach(item => {
      this.productsStore.getById(item.idProduct).subscribe(res => {
        item.product = res.name
      })
      item.size = this.sizesStore.sizes.filter(s => s.id == item.idSize).pop().name
      item.color = this.colorsStore.colors.filter(c => c.id == item.idColor).pop().name
    })
  }

  
  getNameSizeColor() {
    this.productSizeColorsStore.productitems.forEach(item => {
      item.size = this.sizesStore.sizes.filter(s => s.id == item.idSize).pop().name
      item.color = this.colorsStore.colors.filter(c => c.id == item.idColor).pop().name
    })
  }

  getNameProduct() {
    this.productsStore.products.forEach(item => {
      item.name = this.productsStore.products.filter(s=>s.id==item.id).pop.name;
    })
  }

  getNameStaff(idShipper,idEmployee) {
    var shipper = this.staffStore.staff.filter(x => x.idAccount ==  idShipper)[0]
    this.shipper = shipper.idAccount + " - " + shipper.firstName + " " + shipper.lastName

    var employee = this.staffStore.staff.filter(x => x.idAccount ==  idEmployee)[0]
    this.employee = employee.idAccount + " - " + employee.firstName + " " + employee.lastName
  }

}
