import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FilterParamsProduct } from 'src/app/services/model/product/filter-params-product.model';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  
  filter: FilterParamsProduct = {
    pageindex: 1,
    pagesize: 5,
    sort: null
  };

  constructor(private productsStore: ProductsStoreService,
    private toastr: ToastrService) { }

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

  searchEvent($event) {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      sort: this.filter.sort,
      content: $event.content,
      idcategories: $event.idcategories
    }
    this.paginator.pageIndex = 0;

    this.fetchData()
}

  sortID() {
    if(this.productsStore.totalData !== 0) {
      if(this.filter.sort != 'id:asc') {
        this.filter.sort = 'id:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortName() {
    if(this.productsStore.totalData !== 0) {
      if(this.filter.sort != 'name:asc') {
        this.filter.sort = 'name:asc';
      }
      else {
        this.filter.sort = 'name:desc';
      }
      this.fetchData()
    }
  }

  sortSKU() {
    if(this.productsStore.totalData !== 0) {
      if(this.filter.sort != 'sku:asc') {
        this.filter.sort = 'sku:asc';
      }
      else {
        this.filter.sort = 'sku:desc';
      }
      this.fetchData()
    }
  }

  sortTotalBuy() {
    if(this.productsStore.totalData !== 0) {
      if(this.filter.sort != 'totalbuy:asc') {
        this.filter.sort = 'totalbuy:asc';
      }
      else {
        this.filter.sort = 'totalbuy:desc';
      }
      this.fetchData()
    }
  }

  sortCreatedDate() {
    if(this.productsStore.totalData !== 0) {
      if(this.filter.sort != 'createddate:asc') {
        this.filter.sort = 'createddate:asc';
      }
      else {
        this.filter.sort = 'createddate:desc';
      }
      this.fetchData()
    }
  }

}
