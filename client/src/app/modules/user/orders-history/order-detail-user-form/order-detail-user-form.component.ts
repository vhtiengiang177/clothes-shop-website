import { Review } from 'src/app/services/model/review/review.model';
import { OrderDetail } from 'src/app/services/model/order/order-detail.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddressApiService } from 'src/app/services/data/address-api/address-api.service';
import { DeliveryAddress } from 'src/app/services/model/customer/delivery-address.model';
import { OrderDetailForm } from 'src/app/services/model/order/order-detail-form.model';
import { Order } from 'src/app/services/model/order/order.model';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { DeliveryStoreService } from 'src/app/services/store/delivery-store/delivery-store.service';
import { OrderDetailStoreService } from 'src/app/services/store/order-detail-store/order-detail-store.service';
import { OrdersProcessingStoreService } from 'src/app/services/store/orders-processing-store/orders-processing-store.service';
import { ProductSizeColorsStoreService } from 'src/app/services/store/product-size-colors-store/product-size-colors-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';
import { ReviewPageComponent } from '../../review-page/review-page/review-page.component';
import { ReviewStoreService } from 'src/app/services/store/review-store/review-store.service';

@Component({
  selector: 'app-order-detail-user-form',
  templateUrl: './order-detail-user-form.component.html',
  styleUrls: ['./order-detail-user-form.component.css']
})
export class OrderDetailUserFormComponent implements OnInit {
  id: number
  order: Order
  address: string = ""
  promotion: string = ""
  customer: string = ""
  shipper: string = ""
  employee: string = ""
  province: string = ""
  district: string = ""
  ward: string = ""
  discount: number = 0
  deliveryAddress: DeliveryAddress
  review: Review

  constructor(public dialogRef: MatDialogRef<OrderDetailUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailForm,
    private dialog: MatDialog,
    private deliveryStore: DeliveryStoreService,
    private orderStore: OrdersProcessingStoreService,
    private promotionsStore: PromotionsStoreService,
    private orderDetailStore: OrderDetailStoreService,
    private addressAPI: AddressApiService,
    private staffStore: StaffStoreService,
    private productsStore: ProductsStoreService,
    private productSizeColorsStore: ProductSizeColorsStoreService,
    private reviewStore: ReviewStoreService,
    private colorsStore: ColorsStoreService,
    private sizesStore: SizesStoreService) {
      this.id = data.idOrder;
      this.orderStore.getById(data.idOrder).subscribe(res => {
        this.order = res;

        this.fetchOrder()
        this.orderDetailStore.orderdetails$.subscribe(res => {
          if (res) {
            this.getNameEntity()
          }
        })

        this.deliveryStore.getById(this.order.idAddress).subscribe(address => {
          if (address) {
            this.deliveryAddress = address
            
            this.addressAPI.getWard(address.districtId).subscribe(res => {
              this.ward = res.data.find(obj => obj.WardCode === address.wardCode).WardName
              this.addressAPI.getDistrict(address.provinceId).subscribe(res => {
                this.district = res.data.find(obj => obj.DistrictID === address.districtId).DistrictName
                this.addressAPI.getProvince().subscribe(res => {
                  this.province = res.data.find(obj => obj.ProvinceID === address.provinceId).ProvinceName
                  this.address = address.address + ", " + this.ward + ", " + this.district + ", " + this.province + "."
                })
              })
            })
          }
        })

        if (this.order.idPromotion != null) {
          this.promotionsStore.promotions$.subscribe(res => {
            if(res) {
              this.promotionsStore.getById(this.order.idPromotion).subscribe(promotion => {
                if (promotion) {
                  this.promotion = promotion.name + " - " + (promotion.value * 100) + " % "
                  this.discount = this.order.totalProductPrice - this.order.totalAmount
                }
              })
            }
          })
        }

        this.getNameStaff(this.order.idShipper, this.order.idStaff)
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
    if (idShipper != null) {
      this.staffStore.getById(idShipper).subscribe(res => {
        this.shipper = res.idAccount + " - " + res.lastName + " " + res.firstName
      })
    }

    if (idEmployee != null) {
      this.staffStore.getById(idEmployee).subscribe(res => {
        this.employee = res.idAccount + " - " + res.lastName + " " + res.firstName
      })
    }
  }

  reviewOrder(item: OrderDetail) {
    this.reviewStore.getReviewsOfProduct(item.idProduct);
    this.review = this.reviewStore.reviews.find(x=>x.idOrder == item.idOrder && x.idProduct == item.idProduct);
    if (this.order.state == 5 && this.review==null){
      const dialogRef = this.dialog.open(ReviewPageComponent, {
        width: '650px',
        data: { 
         idOrder: item.idOrder,
         idProduct: item.idProduct,
         descriptionDetailOrder: item.product + 'x' + item.quantity + item.size + item.color+ 'Total:'+ item.quantity * item.unitPrice + 'VND'
        }
      });
    }
  }
}
