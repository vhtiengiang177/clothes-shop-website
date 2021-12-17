import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material';
import { Category } from 'src/app/services/model/category/category.model';
import { FilterParamsProduct } from 'src/app/services/model/product/filter-params-product.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  @Output('search-event') searchEvent = new EventEmitter<FilterParamsProduct>()
  @ViewChild('selectCategory', {static: false}) selectCategory: MatSelect

  isAdvance: boolean = false
  isAllCategories : boolean = false;
  categories: Category[] = [];
  minPrice: number
  maxPrice: number

  
  constructor(private categoriesStore: CategoriesStoreService) { }

  ngOnInit() {
  }

  searchProduct(searchInput) {
    let filterParams: FilterParamsProduct = {};
    
    if(this.isAdvance) {
      let idCategories : number[] = [];
      this.categories.filter(k=>k.id != 0).forEach(element => {
        idCategories.push(element.id)
      });
      
      filterParams = {
        idcategories: idCategories,
        minprice: this.minPrice,
        maxprice: this.maxPrice,
        content: searchInput
      }
      this.searchEvent.emit(filterParams);
    }
    else if(searchInput) {
      filterParams = {
        content: searchInput
      }
      this.searchEvent.emit(filterParams);
    }
  }

  searchFilter(){
    this.isAdvance = !this.isAdvance;
  }

  selectedCategories(selected){
    if(this.isAllCategories) {
      this.selectCategory.options.first.deselect();
      this.isAllCategories = !this.isAllCategories; 
    }
    else if (this.selectCategory.options.length == selected.length + 1) {
      this.selectCategory.options.first.select();
      this.isAllCategories = !this.isAllCategories; 
    }
    else
      this.categories = selected;
  }

  selectedAllCategories() {
    this.isAllCategories = !this.isAllCategories; 
    if(this.isAllCategories) {
      this.selectCategory.options.forEach((item : MatOption) => item.select());
    }
    else {
      this.selectCategory.options.forEach((item : MatOption) => {item.deselect()});
    }
    this.selectCategory.close();
  }

  reset() {
    this.categories = []
    this.minPrice = null
    this.maxPrice = null
  }

  checkMinPrice() {
    if(this.minPrice < 0 || this.maxPrice == null) 
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
    if(this.maxPrice < 0 || this.maxPrice == null) 
    {
      this.maxPrice = null;
    }
    if(this.minPrice) {
      if(this.maxPrice < this.minPrice) {
        this.maxPrice = this.minPrice;
      }
    }
  }
}
