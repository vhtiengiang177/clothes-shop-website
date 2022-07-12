import { Options } from '@angular-slider/ngx-slider';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AuthAppService } from 'src/app/services/auth/auth.service';
import { FavoriteService } from 'src/app/services/data/favorite/favorite.service';
import { Category } from 'src/app/services/model/category/category.model';
import { Favorite } from 'src/app/services/model/favorite/favorite.model';
import { FilterParamsProduct } from 'src/app/services/model/product/filter-params-product.model';
import { ProductSizeColor } from 'src/app/services/model/product/product-size-color.model';
import { Product } from 'src/app/services/model/product/product.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { FavoriteStoreService } from 'src/app/services/store/favorite-store/favorite-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';
import { ProductAddCartFormComponent } from '../product-add-cart-form/product-add-cart-form.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  filter: FilterParamsProduct = {
    pageindex: 1,
    pagesize: 6,
    sort: 'name:asc',
    idcategories: []
  };
  throttle = 400;
  scrollDistance = 1;
  categoriesOptions: Category[] = []
  removable = true;
  sortSelected = 'name:asc' 
  minPrice: number;
  maxPrice: number;
  product: Product
  isWhiteHeart: boolean = true
  minValue: number = 0; // min value of price range
  maxValue: number = 0; // max value of price range
  options: Options = {
    floor: 0,
    ceil: 0,
    step: 10000
  };
  maxPriceOfProduct = 0;

  constructor(private productsStore: ProductsStoreService,
    private categoriesStore: CategoriesStoreService,
    private sizesStore: SizesStoreService,
    private colorsStore: ColorsStoreService,
    private favoriteService: FavoriteService,
    private authService: AuthAppService, 
    private favoriteStore: FavoriteStoreService,
    public dialog: MatDialog,
    private toastr: ToastrService) {
      this.productsStore.productsList = []
      this.getMaxPriceOfProduct()
      this.fetchData()
  }

  // onPaginate(pageEvent: PageEvent) {
  //   this.filter.pagesize = +pageEvent.pageSize;
  //   this.filter.pageindex = +pageEvent.pageIndex + 1;
  //   this.fetchData()
  // }

  getMaxPriceOfProduct() {
    this.productsStore.getMaxPriceOfProduct().subscribe(res => {
      console.log(res);
      
      this.options = {
        floor: 0,
        ceil: res,
        step: 10000
      };
      this.maxValue = res;
      this.maxPriceOfProduct = res
    })
  }

  fetchData(_method = "equal") {
    console.log(this.filter)
    this.productsStore.getProductsForClientPageLoadMore(this.filter, _method);

  }

  fetchFavorite(){
    this.favoriteStore.getAllItemsInFavorite()
  }

  sort() {
    if (this.sortSelected != this.filter.sort) {
      this.filter.pagesize = this.productsStore.productsList.length
      this.filter.pageindex = 1
      this.filter.sort = this.sortSelected
      this.fetchData()
    }
  }

  getProductByCategory(value) {
    if(this.categoriesOptions.indexOf(value) == -1) {
      this.categoriesOptions.push(value)
      this.filter.idcategories.push(value.id)
      this.filter.pageindex = 1
      // this.paginator.pageIndex = 0;
      console.log("get product by category ")
      console.log(this.filter)
      this.fetchData()
    }
  }

  remove(value: Category): void {
    const index = this.categoriesOptions.indexOf(value);

    if (index >= 0) {
      this.categoriesOptions.splice(index, 1);
      this.filter.idcategories.splice(index, 1);
      this.filter.pageindex = 1
      // this.paginator.pageIndex = 0;
      this.fetchData()
    }
  }

  filterPrice() {
    // if (Number(this.minPrice) > Number(this.maxPrice) && (this.maxPrice != null || this.minPrice != null)) {
    //   console.log('Min Max',this.minPrice,this.maxPrice);
    //   this.toastr.warning("Minimum price should not be greater than maximum")
    // }
    // else {
    //   if (this.minPrice < 0 || this.maxPrice < 0) {
    //     this.toastr.warning("Minimum/Maximum price should be at least 0 VND")
    //   }
    //   else if (this.minPrice >= 0 || this.maxPrice >= 0) {
    //     this.filter.minprice = this.minPrice
    //     this.filter.maxprice = this.maxPrice
    //     this.filter.pageindex = 1
    //     // this.paginator.pageIndex = 0;
    //     this.fetchData()
    //   }
    //   else this.toastr.warning("Minimum/Maximum price should be at least 0 VND")
    // }

    if (this.minValue == 0 && this.maxPrice == this.maxPriceOfProduct) {
      this.filter.minprice = null;
      this.filter.maxprice = null;
    }
    else {
      this.filter.minprice = this.minValue;
      this.filter.maxprice = this.maxValue
      this.filter.pageindex = 1
    }
    
    this.fetchData()
  }

  searchEvent(value) {
    this.filter.pageindex = 1
    this.filter.content = value

    // this.paginator.pageIndex = 0;

    this.fetchData()
  }

  reloadProduct() {
    this.minPrice = null
    this.maxPrice = null
    this.categoriesOptions = []
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      sort: this.filter.sort
    }
    this.filter.content = null
    // this.paginator.pageIndex = 0;
    this.fetchData()
  }

  addToCart(product) {
    console.log(product.id);
    
    const dialogRef=this.dialog.open(ProductAddCartFormComponent, {
      width: '800px',
      data: { 
        idProduct: product.id,
        idColor: null,
        idSize: null
      }
    });
    dialogRef.afterClosed().subscribe(() => {
        // this.fetchData()
   });
  }

  changeHeart(product,state) {
    if (this.authService.isLoggedIn() && this.authService.getCurrentUser().idTypeAccount == 4){
      if (state === 1){
        this.favoriteService.deleteItemInFavorite(product.id).subscribe(() => {
          this.productsStore.productsList.find(p=>p.id === product.id).isFavorite = false
          this.fetchFavorite();
        }, (e: HttpErrorResponse) => {
          if (e.status == 400)
            this.toastr.error(e.error)
        })} else{
          this.favoriteService.addItemInFavorite(product.id).subscribe(() => {
            this.productsStore.productsList.find(p=>p.id === product.id).isFavorite = true
            this.fetchFavorite();
          }, (e: HttpErrorResponse) => {
            if (e.status == 400)
              this.toastr.error(e.error)
          })
        }
         
    }
  }
  
  onScrollDown(ev) {
    console.log("scrolled down!!", ev);
    if (this.productsStore.totalData > this.productsStore.productsList.length) {
      this.filter.pageindex++;
      this.fetchData("push")
    }
  }
}
