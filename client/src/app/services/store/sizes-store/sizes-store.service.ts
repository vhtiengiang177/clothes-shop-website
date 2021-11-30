import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { SizeService } from '../../data/size/size.service';
import { Size } from '../../model/product/size.model';

@Injectable({
  providedIn: 'root'
})
export class SizesStoreService {
  private readonly _sizes = new BehaviorSubject<Size[]>([]);

  readonly sizes$ = this._sizes.asObservable();

  constructor(private sizeService: SizeService, private toastr: ToastrService) {
    if (this.sizes.length == 0) {
      this.get()
    }
   }

  get sizes() : Size[] {
    return this._sizes.value;
  }

  set sizes(val: Size[]) {
    this._sizes.next(val);
  }

  async get(){
    await this.sizeService.get()
            .subscribe(res => this.sizes = res);
  }

  create(size) {
    return this.sizeService.create("/CreateSize", size).toPromise()
  }
}
