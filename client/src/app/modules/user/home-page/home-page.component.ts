import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FilterParamsProduct } from 'src/app/services/model/product/filter-params-product.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  filterParams: FilterParamsProduct = {
    pageindex: 1,
    pagesize: 3
  }

  constructor(private productsStore: ProductsStoreService,
    private categoriesStore: CategoriesStoreService) { 
    this.productsStore.getAll(this.filterParams)
  }

  ngOnInit() {
  }

}
