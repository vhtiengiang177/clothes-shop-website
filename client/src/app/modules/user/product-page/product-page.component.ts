import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { FilterParamsProduct } from 'src/app/services/model/product/filter-params-product.model';
import { Product } from 'src/app/services/model/product/product.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';

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

  sortSelected = 'name:asc'

  constructor(private productsStore: ProductsStoreService,
    private categoriesStore: CategoriesStoreService,
    private sizesStore: SizesStoreService) {
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
    this.productsStore.getAll(this.filter);
  }

  sort() {
    if (this.sortSelected != this.filter.sort) {
      this.filter.sort = this.sortSelected
      this.fetchData()
    }
  }

  getProductByCategory(value) {
    this.filter.pageindex = 1
    this.filter.idcategories.push(value)
    this.paginator.pageIndex = 0;
    this.fetchData()
  }
}
