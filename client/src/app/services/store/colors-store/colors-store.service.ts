import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ColorService } from '../../data/color/color.service';
import { Color } from '../../model/product/color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorsStoreService {
  private readonly _colors = new BehaviorSubject<Color[]>([]);

  readonly colors$ = this._colors.asObservable();

  constructor(private colorService: ColorService, private toastr: ToastrService) {
    this.get()
   }

  get colors() : Color[] {
    return this._colors.value;
  }

  set colors(val: Color[]) {
    this._colors.next(val);
  }

  async get(){
    await this.colorService.get()
            .subscribe(res => this.colors = res,
              () => {
                this.toastr.error("An unexpected error occurred.", "List Colors")
              });
  }
}
