import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { $ } from 'protractor';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/services/model/cart/cart.model';
import { DeliveryAddress } from 'src/app/services/model/customer/delivery-address.model';
import { OrderDetail } from 'src/app/services/model/order/order-detail.model';
import { Color } from 'src/app/services/model/product/color.model';
import { ProductSizeColor } from 'src/app/services/model/product/product-size-color.model';
import { Product } from 'src/app/services/model/product/product.model';
import { Size } from 'src/app/services/model/product/size.model';
import { Promotion } from 'src/app/services/model/promotion/promotion.model';
import { CartsStoreService } from 'src/app/services/store/carts-store/carts-store.service';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { DeliveryStoreService } from 'src/app/services/store/delivery-store/delivery-store.service';
import { OrdersStoreService } from 'src/app/services/store/orders-store/orders-store.service';
import { ProductSizeColorsStoreService } from 'src/app/services/store/product-size-colors-store/product-size-colors-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';
import { ConfirmFormComponent } from '../../common/confirm-form/confirm-form.component';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  product: Product
  listColors: Color[] = []
  listSizes: Size[] = []
  totalPrice: number = 0
  subTotalPrice: number = 0
  discount: number = 0
  totalPromotion: number = 0
  deliveryAddress: DeliveryAddress = null
  listOrderDetail: OrderDetail[] = []
  listPromotion: Promotion[] = []
  promotion: Promotion = null
  
  constructor(private cartsStore: CartsStoreService,
    private productsStore: ProductsStoreService,
    private productSizeColorsStore: ProductSizeColorsStoreService,
    private sizesStore: SizesStoreService,
    private colorsStore: ColorsStoreService,
    private toastr: ToastrService,
    private orderStore: OrdersStoreService,
    private promotionsStore: PromotionsStoreService,
    private router: Router,
    private dialog: MatDialog) {
      this.cartsStore.carts$.subscribe(res => {
        this.getInfoCart()
      })
      var today = new Date()
      this.promotionsStore.promotions$.subscribe(res => {
        if (res) {
          res.forEach(item => {
            var startDate = new Date(item.startDate)
            var endDate = new Date(item.endDate)
            
            if (startDate <= today && endDate > today) {
              this.listPromotion.push(item)
            }
          })
        }
      })
     }

  ngOnInit() {
  }

  getInfoCart() {
    this.cartsStore.carts.forEach(cart => {
      this.productsStore.getById(cart.idProduct).subscribe(res => {
        this.product = res
        cart.state = this.product.state
        cart.unitPrice = this.product.unitPrice
        cart.nameProduct = this.product.name
        cart.pricePromotion = this.product.pricePromotion
        var psc: ProductSizeColor = {
          idProduct: cart.idProduct,
          idColor: cart.idColor,
          idSize: cart.idSize
        }
        this.productSizeColorsStore.getItemPSC(psc).subscribe(res => {
          
        this.subTotalPrice += (cart.quantity * cart.unitPrice)
        
        this.totalPrice = this.subTotalPrice
          cart.stock = res.stock
          // if (cart.quantity > cart.stock) {
          //   cart.quantity = cart.stock
          //   this.cartsStore.updateQuantityItemInCart(cart).subscribe(null)
          // }
          this.getNameSizeColor(cart)
          this.countTotalPrice()
        })
      })
    })
    this.listColors.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
    this.listSizes.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
  }

  countTotalPrice() {
    this.totalPromotion = 0
    this.subTotalPrice = 0
    this.cartsStore.carts.forEach(item => {
      this.subTotalPrice += item.unitPrice * item.quantity
      this.totalPromotion += item.pricePromotion * item.quantity
    })
    this.totalPrice = this.totalPromotion
    this.discount = this.subTotalPrice - this.totalPromotion
  }

  getNameSizeColor(item: Cart) {
    item.nameSize = this.sizesStore.sizes.find(s => s.id === item.idSize).name
    item.nameColor = this.colorsStore.colors.find(c => c.id == item.idColor).name
    var size: Size = {
      id: item.idSize,
      name: item.nameSize
    }

    if (!this.listSizes.some((item) => item.id == size.id)) {
      this.listSizes.push(size);
    }

    var color: Color = {
      id: item.idColor,
      name: item.nameColor
    }

    if (!this.listColors.some((item) => item.id == color.id)) {
      this.listColors.push(color);
    }
  }

  order() {
    if(this.checkValidate()) {
      this.listOrderDetail = []
      this.cartsStore.carts.forEach(item => {
        var orderDetail: OrderDetail = {
          idProduct: item.idProduct,
          idSize: item.idSize,
          idColor: item.idColor,
          unitPrice: item.unitPrice,
          pricePromotion: item.pricePromotion,
          quantity: item.quantity
        }
        this.listOrderDetail.push(orderDetail)
      })
      var idPromotion = this.promotion ? this.promotion.id : null
      this.orderStore.create(this.listOrderDetail, this.deliveryAddress.id, idPromotion).subscribe(res => {
        this.toastr.success("Order successfully!")
        this.cartsStore.deleteItemsInCart(this.cartsStore.carts).subscribe(() => {
          this.cartsStore.get()
          this.router.navigate(['/my-orders-history'])
        })
        
      }, error => {
        console.log(error);
        this.dialogDeleteProductOutOfStock(error.error)
      })
    }
  }

  checkValidate() {
    if (this.deliveryAddress == null) {
      this.toastr.warning("Please selected a delivery address before place order")
      return false
    } 

    return true
  }

  selectedDeliveryAddress($event) {
    this.deliveryAddress = $event
  }

  selectedPromotion() {
    if (this.promotion != null) {
      this.discount += this.subTotalPrice * this.promotion.value
      this.totalPrice = this.subTotalPrice - this.discount
    }
    else {
      this.totalPrice = this.totalPromotion
      this.discount = this.subTotalPrice - this.totalPromotion
    }
  }

  getProductOutOfStock(item: Product) {
    return "<li>" + item.name + "</li>"
  }

  dialogDeleteProductOutOfStock(lProducts: Product[]) {
    var html = ''
    lProducts.forEach(item => {
      html += this.getProductOutOfStock(item)
    })
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "The products below are out of stock. Do you want to choose another product",
        innerHtml: `<ul>`
         + html
         + `</ul>`
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.router.navigate(['/shopping-cart'])
      }
    });
  }
}
