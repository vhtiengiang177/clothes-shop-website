import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from '../../data/product/product.service';
import { ProductSizeColor } from '../../model/product/product-size-color.model';

@Injectable({
  providedIn: 'root'
})
export class ProductSizeColorsStoreService {
  private readonly _productitems = new BehaviorSubject<ProductSizeColor[]>([]);

  readonly productitems$ = this._productitems.asObservable();

  constructor(private productService: ProductService, private toastr: ToastrService) {
   }

  get productitems() : ProductSizeColor[] {
    return this._productitems.value;
  }

  set productitems(val: ProductSizeColor[]) {
    this._productitems.next(val);
  }

  get(id){
    this.productService.getAllItemOfProduct(id)
            .subscribe(res => this.productitems = res);
  }
}
