import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/services/model/category/category.model';
import { FilterParamsProduct } from 'src/app/services/model/product/filter-params-product.model';
import { ProductSizeColor } from 'src/app/services/model/product/product-size-color.model';
import { Product } from 'src/app/services/model/product/product.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';
import { ProductAddCartFormComponent } from '../product-add-cart-form/product-add-cart-form.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;

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
      if(this.productsStore.products.length != 6) {
        this.fetchData()
      }
  }

  ngOnInit() {
  }

  onPaginate(pageEvent: PageEvent) {
    this.filter.pagesize = +pageEvent.pageSize;
    this.filter.pageindex = +pageEvent.pageIndex + 1;
    this.fetchData()
  }

  fetchData() {
    this.productsStore.getProductsForClientPage(this.filter);
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
    if (this.minPrice > this.maxPrice) {
      this.toastr.warning("Minimum price should not be greater than maximum")
    }
    else {
      if (this.minPrice >= 0) {
        this.filter.minprice = this.minPrice
        this.filter.maxprice = this.maxPrice
        this.filter.pageindex = 1
        this.paginator.pageIndex = 0;
        this.fetchData()
      }
      else this.toastr.warning("Minimum price should be at least 0 VND")
    }
  }

  checkMinPrice() {
    if(this.minPrice < 0) 
    {
      this.minPrice = null;
    }
    if(this.maxPrice) {
      if(this.minPrice > this.maxPrice) {
        this.minPrice = this.maxPrice;
      }
    }
  }
  
  checkMaxPrice() {
    if(this.maxPrice < 0) 
    {
      this.maxPrice = null;
    }
    if(this.minPrice) {
      if(this.maxPrice < this.minPrice) {
        this.maxPrice = this.minPrice;
      }
    }
  }

  searchEvent(value) {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      sort: this.filter.sort,
      content: value,
      idcategories: this.filter.idcategories
    }
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
      width: '1000px',
      data: { 
        idProduct: product.id,
        idColor: null,
        idSize: null
      }
    });
  }
}
