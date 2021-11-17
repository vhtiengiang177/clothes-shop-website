import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Color } from 'src/app/services/model/product/color.model';
import { LogProduct } from 'src/app/services/model/product/log-product.model';
import { ProductForm } from 'src/app/services/model/product/product-form.model';
import { Size } from 'src/app/services/model/product/size.model';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { LogProductsStoreService } from 'src/app/services/store/log-products-store/log-products-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';
import { ProductFormComponent } from '../product-form/product-form.component';

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
  logProduct: LogProduct = {
    id: null,
    idproduct: this.data.product.id,
    idsize: null,
    idcolor: null,
    importprice: 0,
    quantity: 0
  }

  constructor(public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductForm,
    private sizesStore: SizesStoreService,
    private colorsStore: ColorsStoreService,
    private logProductsStore: LogProductsStoreService,
    private toastr: ToastrService) { 
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

  save() {
    console.log(this.sizeInput);
    
    if(this.checkValidate) {
      this.logProduct.idsize = this.sizeInput.value
      this.logProduct.idsize = this.colorInput.value
      
      this.logProductsStore.logproducts.push(this.logProduct)
    }
    console.log(this.logProductsStore.logproducts);
    

  }

  checkValidate() {
    // check dang sai
    console.log("size " + this.sizeInput.value);
    
    if(!this.logProduct.importprice || this.sizeInput.value === null || this.colorInput.value == null) {
      this.toastr.error("Please fill in all the required fields.")
      return false
    }
    return true
  }

}
