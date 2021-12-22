import { CartsStoreService } from 'src/app/services/store/carts-store/carts-store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/services/model/cart/cart.model';
import { Color } from 'src/app/services/model/product/color.model';
import { Image } from 'src/app/services/model/product/image.model';
import { ProductSizeColor } from 'src/app/services/model/product/product-size-color.model';
import { Product } from 'src/app/services/model/product/product.model';
import { Size } from 'src/app/services/model/product/size.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { ProductSizeColorsStoreService } from 'src/app/services/store/product-size-colors-store/product-size-colors-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-product-add-cart-form',
  templateUrl: './product-add-cart-form.component.html',
  styleUrls: ['./product-add-cart-form.component.css']
})
export class ProductAddCartFormComponent implements OnInit {

  id: number
  product: Product
  isVisible: boolean = false
  listImages: Image[] = []
  selectedSizeColor: ProductSizeColor = {
    idColor: null,
    idSize: null,
    stock: null
  }
  oldSelected: Cart = {
    idColor: null,
    idSize: null,
    stock: null
  }
  listColors: Color[] = []
  listSizes: Size[] = []
  quantity: number = 1
  isEnabled = true
  cart: Cart = {}
  isOpenByCart: boolean = false
  outOfStock = false

  constructor(public dialogRef: MatDialogRef<ProductAddCartFormComponent>,private route: ActivatedRoute,
    private router: Router,
    private productsStore: ProductsStoreService,
    private categoriesStore: CategoriesStoreService,
    private productSizeColorsStore: ProductSizeColorsStoreService,
    private sizesStore: SizesStoreService,
    private colorsStore: ColorsStoreService,
    private cartsStoreService: CartsStoreService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: ProductSizeColor) {
      this.id = this.data.idProduct
      this.productsStore.getById(this.id).subscribe(res => {
        this.product = res;
        this.selectedSizeColor.idProduct = this.product.id
        this.oldSelected.idProduct = this.product.id
        this.fetchItem()
        this.getImages(this.product.id)
        this.productSizeColorsStore.productitems$.subscribe(res => {
          if (res) {
            this.getNameSizeColor()
          }
        })
        this.isVisible = true
      }, (error: HttpErrorResponse) => {
        this.dialogRef.close()
      })
      if (data.idColor != null && data.idSize != null) {
        this.selectedSizeColor.idColor = this.data.idColor
        this.selectedSizeColor.idSize = this.data.idSize
        this.selectedSizeColor.stock = this.data.stock
        this.oldSelected.idColor = this.data.idColor
        this.oldSelected.idSize = this.data.idSize
        this.isOpenByCart = true
        this.colorChange(this.selectedSizeColor.idColor)
        this.sizeChange(this.selectedSizeColor.idSize)
      }
      if (data.selectedQuantity != null) {
        this.quantity = data.selectedQuantity
        this.oldSelected.quantity = data.selectedQuantity
      }
  }

  ngOnInit() {
  }

  fetchItem() {
    this.productSizeColorsStore.getItemsOfProductForClientPage(this.product.id)
  }

  getNameSizeColor() {
    this.productSizeColorsStore.productitems.forEach(item => {
      item.size = this.sizesStore.sizes.find(s => s.id == item.idSize).name
      item.color = this.colorsStore.colors.find(c => c.id == item.idColor).name
      var size: Size = {
        id: item.idSize,
        name: item.size
      }

      if (!this.listSizes.some((item) => item.id == size.id)) {
        this.listSizes.push(size);
      }

      var color: Color = {
        id: item.idColor,
        name: item.color
      }

      if (!this.listColors.some((item) => item.id == color.id)) {
        this.listColors.push(color);
      }
    })
    this.listColors.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
    this.listSizes.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
  }

  getImages(id) {
    this.productsStore.getImagesByIdProduct(id).subscribe(res => {
      this.listImages = res
    })
  }

  colorChange($event) {
    // var productItems = this.productSizeColorsStore.productitems.filter(item => item.idColor === $event.value)
    // this.listSizes = []
    // productItems.forEach(item => {
    //   if (!this.listSizes.some((size) => size.id == item.idSize)) {
    //     var size: Size = {
    //       id: item.idSize,
    //       name: item.size
    //     }

    //     this.listSizes.push(size);
    //   }
    // });

    // this.listSizes.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
    if ($event.value != undefined) {
      this.selectedSizeColor.idColor = $event.value
      this.checkStock()
    }
  }

  sizeChange($event) {
    // var productItems = this.productSizeColorsStore.productitems.filter(item => item.idSize === $event.value)
    // this.listColors = []
    // productItems.forEach(item => {
    //   if (!this.listColors.some((color) => color.id == item.idColor)) {
    //     var color: Color = {
    //       id: item.idColor,
    //       name: item.color
    //     }

    //     this.listColors.push(color);
    //   }
    // });

    // this.listColors.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
    if ($event.value != undefined) {
      this.selectedSizeColor.idSize = $event.value
      this.checkStock()
    }
  }

  checkStock() {
    if (this.selectedSizeColor.idColor != null && this.selectedSizeColor.idSize != null) {
      this.fetchItem()
      this.selectedSizeColor.stock = this.productSizeColorsStore.productitems.find(item => item.idColor == this.selectedSizeColor.idColor
        && item.idSize == this.selectedSizeColor.idSize) ? this.productSizeColorsStore.productitems.find(item => item.idColor == this.selectedSizeColor.idColor
          && item.idSize == this.selectedSizeColor.idSize).stock : 0
       
      if(this.selectedSizeColor.stock > 0) {
        this.isEnabled = true
      }
      else {
        this.isEnabled = false
        this.selectedSizeColor.stock = null
      } 

      this.outOfStock = !this.isEnabled
    }
  }

  // changeQuantity() {
  //   if (this.selectedSizeColor.idColor != null && this.selectedSizeColor.idSize != null) {
  //     if (this.quantity > this.selectedSizeColor.stock) {
  //       this.quantity = this.selectedSizeColor.stock
  //       this.toastr.warning("The selected quantity exceeds quantity available in stock")
  //     }
  //     else if (this.quantity < 1 || this.quantity == null) {
  //       this.toastr.warning("The selected quantity must be one or more")
  //       this.quantity = 1
  //     }
  //   }
  //   else {
  //     this.toastr.warning("Please select a color and a size of the product")
  //     this.quantity = 1
  //   } 
  // }

  addToCart(){
    if (this.selectedSizeColor.idColor != null && this.selectedSizeColor.idSize != null) {
      if (this.quantity < 1 || this.quantity == null) {
        this.toastr.warning("The selected quantity must be one or more")
      }
      else if (this.selectedSizeColor.stock >= this.quantity) {
        this.cart.idColor = this.selectedSizeColor.idColor
        this.cart.idSize = this.selectedSizeColor.idSize
        this.cart.idProduct = this.product.id
        this.cart.quantity = this.quantity
        if (!this.isOpenByCart) { // Add cart
          this.cartsStoreService.add(this.cart).subscribe(res => {
            this.cartsStoreService.get()
            this.toastr.success("Success");
          }, (error: HttpErrorResponse) => {
            if (error.status == 400) {
              this.toastr.error("It looks like something went wrong")
            }
          })
        }
        else {
          if (this.oldSelected.idColor != this.cart.idColor || this.oldSelected.idSize != this.cart.idSize) {
            var listCart: Cart[] = [] // update new item from old item in cart
            this.oldSelected.idCustomer = 0
            listCart.push(this.oldSelected)
            this.cartsStoreService.deleteItemsInCart(listCart).subscribe(() => {
              this.cartsStoreService.add(this.cart).subscribe(res => {
                this.toastr.success("Update successfully");
                this.dialogRef.close()
              }, (error: HttpErrorResponse) => {
                if (error.status == 400) {
                  this.toastr.error("It looks like something went wrong")
                }
              })
            })
          }
          else {
            // update quantity of cart
            this.cartsStoreService.add(this.cart).subscribe(res => {
              this.toastr.success("Update successfully");
              this.dialogRef.close()
            }, (error: HttpErrorResponse) => {
              if (error.status == 400) {
                this.toastr.error("It looks like something went wrong")
              }
            })
          }
        }
      }
      else if (this.selectedSizeColor.stock == null || this.selectedSizeColor.stock < this.quantity) {
        this.toastr.warning("The selected quantity exceeds quantity available in stock")
      }
      else {
        this.toastr.warning("Please select a color and a size of the product")
      } 
    }
  }
}
