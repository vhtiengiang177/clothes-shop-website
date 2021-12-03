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
  listColors: Color[] = []
  listSizes: Size[] = []
  quantity: number = 1
  isEnabled = true
  cart: Cart = {}

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
      this.id = data.idProduct
      this.productsStore.getById(data.idProduct).subscribe(res => {
        this.product = res;
        this.selectedSizeColor.idProduct = this.product.id;
        this.product.category = this.categoriesStore.categories.filter(s => s.id == this.product.idCategory).length > 0
          ? this.categoriesStore.categories.filter(s => s.id == this.product.idCategory).pop().name : ""
        this.fetchItem()
        this.getImages(this.product.id)
        this.productSizeColorsStore.productitems$.subscribe(res => {
          if (res) {
            this.getNameSizeColor()
          }
        })
        this.isVisible = true
      }, (error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.router.navigate(['/not-found'])
        }
      })
    
  }

  // constructor(public dialogRef: MatDialogRef<ConfirmFormComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: ConfirmData) {
  //     this.confirmtext = data.text
  //     this.remindtext = data.remindtext
  //    }

  ngOnInit() {
  }

  fetchItem() {
    this.productSizeColorsStore.getItemsOfProductForClientPage(this.product.id)
  }

  getNameSizeColor() {
    this.productSizeColorsStore.productitems.forEach(item => {
      item.size = this.sizesStore.sizes.filter(s => s.id == item.idSize).pop().name
      item.color = this.colorsStore.colors.filter(c => c.id == item.idColor).pop().name
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
    var productItems = this.productSizeColorsStore.productitems.filter(item => item.idColor === $event.value)
    this.listSizes = []
    productItems.forEach(item => {
      if (!this.listSizes.some((size) => size.id == item.idSize)) {
        var size: Size = {
          id: item.idSize,
          name: item.size
        }

        this.listSizes.push(size);
      }
    });

    this.listSizes.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));

    this.selectedSizeColor.idColor = $event.value

    this.checkStock()
  }

  sizeChange($event) {
    var productItems = this.productSizeColorsStore.productitems.filter(item => item.idSize === $event.value)
    this.listColors = []
    productItems.forEach(item => {
      if (!this.listColors.some((color) => color.id == item.idColor)) {
        var color: Color = {
          id: item.idColor,
          name: item.color
        }

        this.listColors.push(color);
      }
    });

    this.listColors.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));

    this.selectedSizeColor.idSize = $event.value

    this.checkStock()
  }

  checkStock() {
    console.log(this.productSizeColorsStore.productitems);

    if (this.selectedSizeColor.idColor != null && this.selectedSizeColor.idSize != null) {
      this.selectedSizeColor.stock = this.productSizeColorsStore.productitems.filter(item => item.idColor == this.selectedSizeColor.idColor
        && item.idSize == this.selectedSizeColor.idSize).pop().stock

        if(this.selectedSizeColor.stock > 0) {
          this.isEnabled = true
        }
        else this.isEnabled = false
    }
  }

  decQuantity() {
    if (this.selectedSizeColor.idColor != null && this.selectedSizeColor.idSize != null) {
      if (this.quantity > 1)
        this.quantity -= 1
      else this.toastr.warning("The selected quantity must be one or more")
    }
    else this.toastr.warning("Please select a color and a size of the product")
    //this.quantity -= 1
  }

  incQuantity() {
    if (this.selectedSizeColor.idColor != null && this.selectedSizeColor.idSize != null) {
      if (this.quantity > this.selectedSizeColor.stock) {
        this.toastr.warning("The selected quantity exceeds quantity available in stock")
      }
      else this.quantity += 1
    }
    else this.toastr.warning("Please select a color and a size of the product")
  }

  changeQuantity() {
    if (this.selectedSizeColor.idColor != null && this.selectedSizeColor.idSize != null) {
      if (this.quantity > this.selectedSizeColor.stock) {
        this.quantity = this.selectedSizeColor.stock
        this.toastr.warning("The selected quantity exceeds quantity available in stock")
      }
      else if (this.quantity < 1 || this.quantity == null) {
        this.toastr.warning("The selected quantity must be one or more")
        this.quantity = 1
      }
    }
    else {
      this.toastr.warning("Please select a color and a size of the product")
      this.quantity = 1
    } 
  }

  addToCart(){
    console.log(this.selectedSizeColor);
    
    if (this.selectedSizeColor.idColor != null && this.selectedSizeColor.idSize != null) {
      this.cart.idColor = this.selectedSizeColor.idColor
      this.cart.idSize =  this.selectedSizeColor.idSize
      this.cart.idProduct = this.product.id
      this.cart.quantity = this.quantity
      this.cartsStoreService.add(this.cart).subscribe(res => {
        this.toastr.success("Success");
      }, (error:HttpErrorResponse) => {
        if(error.status == 400) {
          this.toastr.error("It looks like something went wrong")
        }
      })
    }
    else {
      this.toastr.warning("Please select a color and a size of the product")
    } 
  }

}
