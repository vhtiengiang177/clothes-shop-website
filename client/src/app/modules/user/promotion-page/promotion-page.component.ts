import { Component, OnInit, ViewChild } from '@angular/core';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { Product } from 'src/app/services/model/product/product.model';
import { CartsStoreService } from 'src/app/services/store/carts-store/carts-store.service';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { ProductAddCartFormComponent } from '../product-add-cart-form/product-add-cart-form.component';
import { interval } from 'rxjs';
import { Category } from 'src/app/services/model/category/category.model';
import { FilterParamsProduct } from 'src/app/services/model/product/filter-params-product.model';
import { ProductSizeColor } from 'src/app/services/model/product/product-size-color.model';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promotion-page',
  templateUrl: './promotion-page.component.html',
  styleUrls: ['./promotion-page.component.css']
})

export class PromotionPageComponent implements OnInit {
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  productTopBestSellers: Product[] = []
  productTopNew: Product[] = []
  images = [
    {path: '../../../../assets/img/carousel/hero-1.png'},
    // {path: '../../../../assets/img/carousel/hero-2.png'},
    // {path: '../../../../assets/img/carousel/hero-3.png'},
    // {path: '../../../../assets/img/carousel/hero-4.jpg'}
  ]
  days: string = ""
  hours: string = ""
  minutes: string = ""
  seconds: string = ""

  filter: FilterParamsProduct = {
    pageindex: 1,
    pagesize: 6,
    sort: 'name:asc',
    idcategories: []
  };

  categoriesOptions: Category[] = []
  removable = true;
  sortSelected = 'name:asc' 
  minPrice: number;
  maxPrice: number;

  constructor(private productsStore: ProductsStoreService,
    private categoriesStore: CategoriesStoreService,
    private sizesStore: SizesStoreService,
    private colorsStore: ColorsStoreService,
    public dialog: MatDialog,
    private toastr: ToastrService) {
      
        this.fetchData();
      
  }

  ngOnInit() {
  }

  onPaginate(pageEvent: PageEvent) {
    this.filter.pagesize = +pageEvent.pageSize;
    this.filter.pageindex = +pageEvent.pageIndex + 1;
    this.fetchData()
  }

  fetchData() {
    this.productsStore.getProductsSaleOffForClientPage(this.filter);
  }

  sort() {
    if (this.sortSelected != this.filter.sort) {
      this.filter.sort = this.sortSelected
      this.fetchData()
    }
  }

  getProductByCategory(value) {
    if(this.categoriesOptions.indexOf(value) == -1) {
      this.categoriesOptions.push(value)
      this.filter.idcategories.push(value.id)
      this.filter.pageindex = 1
      this.paginator.pageIndex = 0;
      this.fetchData()
    }
  }

  remove(value: Category): void {
    const index = this.categoriesOptions.indexOf(value);

    if (index >= 0) {
      this.categoriesOptions.splice(index, 1);
      this.filter.idcategories.splice(index, 1);
      this.filter.pageindex = 1
      this.paginator.pageIndex = 0;
      this.fetchData()
    }
  }

  filterPrice() {
    if (this.minPrice > this.maxPrice && (this.maxPrice != null || this.minPrice != null)) {
      this.toastr.warning("Minimum price should not be greater than maximum")
    }
    else {
      if (this.minPrice < 0 || this.maxPrice < 0) {
        this.toastr.warning("Minimum/Maximum price should be at least 0 VND")
      }
      else if (this.minPrice >= 0 || this.maxPrice >= 0) {
        this.filter.minprice = this.minPrice
        this.filter.maxprice = this.maxPrice
        this.filter.pageindex = 1
        this.paginator.pageIndex = 0;
        this.fetchData()
      }
      else this.toastr.warning("Minimum/Maximum price should be at least 0 VND")
    }
  }

  searchEvent(value) {
    this.filter.pageindex = 1
    this.filter.content = value

    this.paginator.pageIndex = 0;

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
    this.paginator.pageIndex = 0;
    this.fetchData()
  }

  addToCart(product) {
    console.log(product.id);
    
    this.dialog.open(ProductAddCartFormComponent, {
      width: '800px',
      data: { 
        idProduct: product.id,
        idColor: null,
        idSize: null
      }
    });
  }

}
