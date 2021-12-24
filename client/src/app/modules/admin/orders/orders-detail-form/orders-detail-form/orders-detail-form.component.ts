

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
import { Order } from 'src/app/services/model/order/order.model';
import { OrderDetailForm } from 'src/app/services/model/order/order-detail-form.model';
import { DeliveryAddressService } from 'src/app/services/data/delivery-address/delivery-address.service';
import { AddressApiService } from 'src/app/services/data/address-api/address-api.service';

@Component({
  selector: 'app-orders-detail-form',
  templateUrl: './orders-detail-form.component.html',
  styleUrls: ['./orders-detail-form.component.css']
})
export class OrdersDetailFormComponent implements OnInit {

  isVisible = false
  id: number
  order: Order
  address: string = ""
  promotion: string = ""
  customer: string =""
  shipper: string =""
  employee: string =""
  province: string=""
  district: string=""
  ward: string=""
  linkBack: string
  listImages: Image[]
  static readonly addForm = 0;
  static readonly importForm = 1;
  static readonly deleteForm = 2;

    constructor(public dialogRef: MatDialogRef<OrdersDetailFormComponent>,public dialog: MatDialog,
     @Inject(MAT_DIALOG_DATA) public data: OrderDetailForm,
    private route: ActivatedRoute,
    private router: Router,
    private productsStore: ProductsStoreService,
    private promotionsStore: PromotionsStoreService,
    private deliveryStore: DeliveryStoreService,
    private orderDetailStore: OrderDetailStoreService,
    private orderStore: OrdersProcessingStoreService,
    private customerStore: CustomersStoreService,
    private colorsStore: ColorsStoreService,
    private sizesStore: SizesStoreService,
    private staffStore: StaffStoreService,
    private productSizeColorsStore: ProductSizeColorsStoreService,
    private deliveryAddressService: DeliveryAddressService,
    private addressAPI: AddressApiService,
    private toastr: ToastrService) { 
    
        this.id = data.idOrder;
        this.orderStore.getById(data.idOrder).subscribe(res => {
          this.isVisible = true;
          this.order = res;
         
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
                  this.addressAPI.getWard(address.districtId).subscribe(res => {
                    this.ward = res.data.find(obj => obj.WardCode === address.wardCode).WardName
                    this.addressAPI.getDistrict(address.provinceId).subscribe(res => {
                      this.district = res.data.find(obj => obj.DistrictID === address.districtId).DistrictName
                      this.addressAPI.getProvince().subscribe(res => {
                        this.province = res.data.find(obj => obj.ProvinceID === address.provinceId).ProvinceName
                        this.address =  address.address + ", " + this.ward + ", " + this.district + ", " + this.province + "."
                      })
                    })
                  })
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
    }
    

  ngOnInit() {
  }

  
  fetchOrder() {
    this.orderDetailStore.get(this.id)
    this.deliveryStore.getAllDeliveryAddress()
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
