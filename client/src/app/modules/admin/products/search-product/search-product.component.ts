import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterParamsProduct } from 'src/app/services/model/product/filter-params-product.model';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  @Output('search-event') searchEvent = new EventEmitter<FilterParamsProduct>();
  constructor() { }

  ngOnInit() {
  }

  searchProduct(searchInput) {
    let filterParams: FilterParamsProduct = {};
    
    this.searchEvent.emit(filterParams);
  }
}
