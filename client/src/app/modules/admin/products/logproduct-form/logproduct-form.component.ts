import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Color } from 'src/app/services/model/product/color.model';
import { Size } from 'src/app/services/model/product/size.model';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';

@Component({
  selector: 'app-logproduct-form',
  templateUrl: './logproduct-form.component.html',
  styleUrls: ['./logproduct-form.component.css']
})
export class LogproductFormComponent implements OnInit {
  sizeInput = new FormControl()
  sizeOptions: Observable<Size[]>
  colorInput = new FormControl()
  colorOptions: Observable<Color[]>

  constructor(private sizesStore: SizesStoreService,
    private colorsStore: ColorsStoreService) { 
     this.sizeOptions = this.sizeInput.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filterSize(name) : this.sizesStore.sizes.slice())),
    );

    this.colorOptions = this.colorInput.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filterColor(name) : this.colorsStore.colors.slice())),
    );
  }

  ngOnInit() {
  }

  displayFnSize(size: Size): string {
    return size && size.name ? size.name : '';
  }

  private _filterSize(name: string): Size[] {
    const filterValue = name.toLowerCase();
    return this.sizesStore.sizes.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFnColor(color: Color): string {
    return color && color.name ? color.name : '';
  }

  private _filterColor(name: string): Color[] {
    const filterValue = name.toLowerCase();
    return this.colorsStore.colors.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
