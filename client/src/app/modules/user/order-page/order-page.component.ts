import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/services/model/cart/cart.model';
import { DeliveryAddress } from 'src/app/services/model/customer/delivery-address.model';
import { OrderDetail } from 'src/app/services/model/order/order-detail.model';
import { Color } from 'src/app/services/model/product/color.model';
import { ProductSizeColor } from 'src/app/services/model/product/product-size-color.model';
import { Product } from 'src/app/services/model/product/product.model';
import { Size } from 'src/app/services/model/product/size.model';
import { CartsStoreService } from 'src/app/services/store/carts-store/carts-store.service';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { DeliveryStoreService } from 'src/app/services/store/delivery-store/delivery-store.service';
import { ProductSizeColorsStoreService } from 'src/app/services/store/product-size-colors-store/product-size-colors-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  formAddress: FormGroup
  product: Product
  listColors: Color[] = []
  listSizes: Size[] = []
  totalPrice: number = 0
  deliveryAddress: DeliveryAddress = {}
  listOrderDetail: OrderDetail[] = []
  
  constructor(private cartsStore: CartsStoreService,
    private productsStore: ProductsStoreService,
    private productSizeColorsStore: ProductSizeColorsStoreService,
    private sizesStore: SizesStoreService,
    private colorsStore: ColorsStoreService,
    private toastr: ToastrService,
    private deliveryStore: DeliveryStoreService, 
    formBuilder: FormBuilder) {
      this.formAddress = formBuilder.group(
        {
          lastName: [undefined],
          firstName: [undefined, [Validators.required]],
          address: [undefined, [Validators.required]],
          wards: [undefined, [Validators.required]],
          district: [undefined, [Validators.required]],
          province: [undefined, [Validators.required]],
          phone: [undefined, [Validators.required]]
        }
      );
      this.cartsStore.carts$.subscribe(res => {
        this.getInfoCart()
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
        this.totalPrice += cart.quantity * cart.unitPrice
        cart.nameProduct = this.product.name
        var psc: ProductSizeColor = {
          idProduct: cart.idProduct,
          idColor: cart.idColor,
          idSize: cart.idSize
        }
        this.productSizeColorsStore.getItemPSC(psc).subscribe(res => {
          cart.stock = res.stock
          if (cart.quantity > cart.stock) {
            cart.quantity = cart.stock
            this.cartsStore.updateQuantityItemInCart(cart).subscribe(null)
          }
          this.getNameSizeColor(cart)

        })
      })
    })
    this.listColors.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
    this.listSizes.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
  }

  getNameSizeColor(item: Cart) {
    item.nameSize = this.sizesStore.sizes.filter(s => s.id === item.idSize).pop().name
    item.nameColor = this.colorsStore.colors.filter(c => c.id == item.idColor).pop().name
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

  order(formAddress) {
    if(!formAddress.valid) {
      this.toastr.error("Please fill in all the required fields.")
      return
    }
    if(formAddress.valid && this.checkValidate()) {
      this.deliveryAddress = {
        fisrtName: this.formAddress.get('firstName').value.trim(),
        lastName: this.formAddress.get('lastName').value,
        phone: this.formAddress.get('phone').value.trim(),
        address: this.formAddress.get('address').value.trim(),
        province: this.formAddress.get('firstName').value.trim(),
        district: this.formAddress.get('firstName').value.trim(),
        wards: this.formAddress.get('firstName').value.trim()
      }
      this.deliveryStore.create(this.deliveryAddress).subscribe(res => {
        this.deliveryAddress = res
        console.log(this.deliveryAddress);
        this.cartsStore.carts.forEach(item => {
          var orderDetail: OrderDetail = {
            idProduct: item.idProduct,
            idSize: item.idSize,
            idColor: item.idColor,
            unitPrice: item.unitPrice,
            quantity: item.quantity
          }
          this.listOrderDetail.push(orderDetail)
        })
        
      })
    }
  }

  checkValidate() {
    console.log("check");
    
    if(this.formAddress.get('firstName').value.trim() == "" 
    || this.formAddress.get('address').value.trim() == ""
    || this.formAddress.get('wards').value.trim() == ""
    || this.formAddress.get('district').value.trim() == ""
    || this.formAddress.get('province').value.trim() == ""
    || this.formAddress.get('phone').value.trim() == "") {
      this.toastr.error("Please fill in all the required fields.")
      return false
    }

    return true
  }
}
