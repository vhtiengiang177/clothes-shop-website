import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { ColorService } from '../../data/color/color.service';
import { Color } from '../../model/product/color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorsStoreService {
  private readonly _colors = new BehaviorSubject<Color[]>([]);

  readonly colors$ = this._colors.asObservable();

  constructor(private colorService: ColorService, private toastr: ToastrService) {
    if (this.colors.length == 0) {
      this.get()
    }
   }

  get colors() : Color[] {
    return this._colors.value;
  }

  set colors(val: Color[]) {
    this._colors.next(val);
  }

  async get(){
    await this.colorService.get()
            .subscribe(res => this.colors = res);
  }

  create(color: Color) {
    return this.colorService.create("/CreateColor", color).toPromise()
  }
}
