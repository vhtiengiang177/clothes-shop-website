import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/services/model/cart/cart.model';
import { Color } from 'src/app/services/model/product/color.model';
import { ProductSizeColor } from 'src/app/services/model/product/product-size-color.model';
import { Product } from 'src/app/services/model/product/product.model';
import { Size } from 'src/app/services/model/product/size.model';
import { CartsStoreService } from 'src/app/services/store/carts-store/carts-store.service';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { ProductSizeColorsStoreService } from 'src/app/services/store/product-size-colors-store/product-size-colors-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  listCart: Cart[] = []
  product: Product
  listColors: Color[] = []
  listSizes: Size[] = []
  totalPrice: number = 0
  listCartSelected: Cart[] = []

  constructor(private cartsStore: CartsStoreService,
    private productsStore: ProductsStoreService,
    private productSizeColorsStore: ProductSizeColorsStoreService,
    private sizesStore: SizesStoreService,
    private colorsStore: ColorsStoreService,
    private toastr: ToastrService) {
    this.cartsStore.carts$.subscribe(res => {
      //this.listCart = res

      this.getInfoCart()
    })
  }

  ngOnInit() {
  }

  getInfoCart() {
    // this.listCart.forEach(cart => {
    //   this.productsStore.getById(cart.idProduct).subscribe(res => {
    //     this.product = res
    //     cart.state = this.product.state
    //     cart.unitPrice = this.product.unitPrice
    //     this.totalPrice += cart.quantity * cart.unitPrice
    //     cart.nameProduct = this.product.name
    //     var psc: ProductSizeColor = {
    //       idProduct: cart.idProduct,
    //       idColor: cart.idColor,
    //       idSize: cart.idSize
    //     }
    //     this.productSizeColorsStore.getItemPSC(psc).subscribe(res => {
    //       cart.stock = res.stock
          
    //       this.getNameSizeColor(cart)
    //     })
    //   })
    // })
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

  changeQuantity(input, item) {
    if (item.quantity > item.stock) {
      item.quantity = item.stock
      this.toastr.warning("The selected quantity exceeds quantity available in stock")
    }
    else if (item.quantity < 1 || item.quantity == null) {
      this.toastr.warning("The selected quantity must be one or more")
      item.quantity = 1
    }
    this.cartsStore.updateQuantityItemInCart(item).subscribe(res => {
       item.quantity = res.quantity
    }, () => {
      this.toastr.error("Something went wrong!")
    })
  }

  countTotalPrice() {
    this.totalPrice = 0
    this.cartsStore.carts.forEach(item => {
      this.totalPrice += item.unitPrice * item.quantity
    })
  }

  removeItem(item, index) {
    this.listCartSelected.push(item);
    this.cartsStore.deleteItemsInCart(this.listCartSelected).subscribe(() => {
      this.listCartSelected = []
      this.cartsStore.carts.splice(index,1)
      this.countTotalPrice()
    }, (error: HttpErrorResponse) => {
      if(error.status == 404)
        this.toastr.error("Could not find this item")
      else this.toastr.error("Something went wrong!")
    })
  }
}
