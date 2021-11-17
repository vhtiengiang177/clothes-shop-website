import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { LogProductService } from '../../data/log-product/log-product.service';
import { LogProduct } from '../../model/product/log-product.model';

@Injectable({
  providedIn: 'root'
})
export class LogProductsStoreService {
  private readonly _logproducts = new BehaviorSubject<LogProduct[]>([]);

  readonly logproducts$ = this._logproducts.asObservable();

  constructor(private logProductService: LogProductService, private toastr: ToastrService) {
    
   }

  get logproducts() : LogProduct[] {
    return this._logproducts.value;
  }

  set logproducts(val: LogProduct[]) {
    this._logproducts.next(val);
  }
}
