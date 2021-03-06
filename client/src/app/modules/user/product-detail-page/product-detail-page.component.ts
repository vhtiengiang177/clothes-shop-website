import { ReviewService } from './../../../services/data/review/review.service';
import { ReviewStoreService } from './../../../services/store/review-store/review-store.service';
import { Review } from './../../../services/model/review/review.model';
import { CartsStoreService } from 'src/app/services/store/carts-store/carts-store.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
import { FavoriteService } from 'src/app/services/data/favorite/favorite.service';
import { Favorite } from 'src/app/services/model/favorite/favorite.model';
import { FavoriteStoreService } from 'src/app/services/store/favorite-store/favorite-store.service';
import { AuthAppService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/_shared/constant/share-service';
import { CustomerService } from 'src/app/services/data/customer/customer.service';
import { CustomersStoreService } from 'src/app/services/store/customers-store/customers-store.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {
  id: number
  product: Product
  listReviews: Review[] = []
  isVisible: boolean = false
  isWhiteHeart: boolean = true
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
  outOfStock = false
  imageMain: string = ""
  arr: any[] = [];
	index:number = -1;
  name: string
  imageUrl: string = null

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productsStore: ProductsStoreService,
    private categoriesStore: CategoriesStoreService,
    private sharedService: SharedService,
    private productSizeColorsStore: ProductSizeColorsStoreService,
    private sizesStore: SizesStoreService,
    private colorsStore: ColorsStoreService,
    private authService: AuthAppService, 
    private cartsStoreService: CartsStoreService,
    private favoriteService: FavoriteService,
    private favoriteStore: FavoriteStoreService,
    private reviewStore: ReviewStoreService,
    private reviewService: ReviewService,
    private customerService: CustomerService,
    private customerStore: CustomersStoreService,
    
    private toastr: ToastrService) {
    this.arr = [1, 2, 3, 4, 5];
    
    sharedService.changeEmitted$.subscribe(res => {
        this.imageUrl = res
      })
    this.route.params.subscribe((param) => {
      this.id = param['id']
      this.productsStore.getById(param['id']).subscribe(res => {
        this.product = res;
        this.selectedSizeColor.idProduct = this.product.id
        this.product.category = this.categoriesStore.categories.filter(s => s.id == this.product.idCategory).length > 0
          ? this.categoriesStore.categories.filter(s => s.id == this.product.idCategory)[0].name : ""
        this.fetchItem()
        this.getImages(this.product.id)
        
        this.isVisible = true
        if (authService.isLoggedIn()) {
          this.favoriteService.getItemFavorite(this.product.id).subscribe(res => {
            if (res.length != 0){
              this.product.isFavorite = true
            }
          });
        }
        

        this.reviewService.getReviewByProduct(this.product.id).subscribe(res => {
          if (res.length != 0){
            this.listReviews = res
            this.listReviews.forEach(item => {
              this.customerStore.getCustomerById(item.idUser).subscribe(customer => {
                    if (customer) {
                      item.lastName =  customer.firstName + " "
                      item.firstName = customer.lastName
                      item.image = customer.image;
                      console.log('customer:',customer)
                    }
                  })
            })
          }
        });
      }, (error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.router.navigate(['/not-found'])
        }
      })
    })
  }

  ngOnInit() {
  }

  onClickItem(index) {
		//console.log(index);
		this.index = index;
	}
  
  fetchItem() {
    this.productSizeColorsStore.getItemsOfProductForClientPage(this.product.id).subscribe(res => {
      this.productSizeColorsStore.productitems = res
      if (this.productSizeColorsStore.productitems) {
        this.getNameSizeColor()
      }
    })
  }

  fetchReviews(){
    this.reviewStore.getReviewsOfProduct(this.product.id)
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
      if (this.listImages.length > 0) {
        this.imageMain = this.listImages[0].url
      }
    })
  }

  colorChange($event) {
    //var productItems = this.productSizeColorsStore.productitems.filter(item => item.idColor === $event.value)
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

    this.selectedSizeColor.idColor = $event.value

    this.checkStock()
  }

  sizeChange($event) {
    //var productItems = this.productSizeColorsStore.productitems.filter(item => item.idSize === $event.value)
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

    this.selectedSizeColor.idSize = $event.value

    this.checkStock()
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

  changeQuantity() {
    // if (this.selectedSizeColor.idColor != null && this.selectedSizeColor.idSize != null) {
    //   if (this.quantity > this.selectedSizeColor.stock) {
    //     this.quantity = this.selectedSizeColor.stock
    //     this.toastr.warning("The selected quantity exceeds quantity available in stock")
    //   }
    //   else if (this.quantity < 1 || this.quantity == null) {
    //     this.toastr.warning("The selected quantity must be one or more")
    //     this.quantity = 1
    //   }
    // }
    // else {
    //   this.toastr.warning("Please select a color and a size of the product")
    //   this.quantity = 1
    // } 
  }

  changeHeart() {
    if (this.authService.isLoggedIn() && this.authService.getCurrentUser().idTypeAccount == 4){
      if (this.product.isFavorite){
        this.favoriteService.deleteItemInFavorite(this.product.id).subscribe(() => {
          this.product.isFavorite = false;
          this.fetchFavorite();
        }, (e: HttpErrorResponse) => {
          if (e.status == 400)
            this.toastr.error(e.error)
        })
      }else{
        this.favoriteService.addItemInFavorite(this.product.id).subscribe(() => {
          this.product.isFavorite = true;
          this.fetchFavorite();
        }, (e: HttpErrorResponse) => {
          if (e.status == 400)
            this.toastr.error(e.error)
        })
      }
    }
  }

  fetchFavorite(){
    this.favoriteStore.getAllItemsInFavorite()
  }

  addToCart(){
    if (this.selectedSizeColor.idColor != null && this.selectedSizeColor.idSize != null) {
      if (this.quantity < 1 || this.quantity == null) {
        this.toastr.warning("The selected quantity must be one or more")
      }
      else if (this.selectedSizeColor.stock >= this.quantity) {
        this.cart.idColor = this.selectedSizeColor.idColor
        this.cart.idSize =  this.selectedSizeColor.idSize
        this.cart.idProduct = this.product.id
        this.cart.quantity = this.quantity
        this.cartsStoreService.add(this.cart).subscribe(res => {
          this.cartsStoreService.get()
          this.toastr.success("Success");
        }, (error:HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("It looks like something went wrong")
          }
        })
      }
      else if (this.selectedSizeColor.stock == null || this.selectedSizeColor.stock < this.quantity) {
        this.toastr.warning("The selected quantity exceeds quantity available in stock")
      }
      else {
        this.toastr.warning("Please select a color and a size of the product")
      } 
    }
  }

  clickImage(image) {
    this.imageMain = image.url
  }

}
