import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Color } from 'src/app/services/model/product/color.model';
import { LogProduct } from 'src/app/services/model/product/log-product.model';
import { ProductSizeColorForm } from 'src/app/services/model/product/product-size-color-form.model';
import { Size } from 'src/app/services/model/product/size.model';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
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
  newSize: Size = {}
  newColor: Color = {}
  logProduct: LogProduct = {
    idProduct: this.data.product.id,
    idSize: null,
    idColor: null,
    quantity: 0
  }
  isMatComplete = true

  constructor(public dialogRef: MatDialogRef<LogproductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductSizeColorForm,
    private productsStore: ProductsStoreService,
    private sizesStore: SizesStoreService,
    private colorsStore: ColorsStoreService,
    private toastr: ToastrService) { 
      if (data.typeform == 1)
        this.isMatComplete = false

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
    this.checkTypeForm()
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

  async save() {
    if(this.checkValidate()) {
      if(this.data.typeform == 0) {
        if(typeof this.sizeInput.value === 'string' || this.sizeInput instanceof String) {
          this.newSize = {
            name: this.sizeInput.value
          } 
          const resSize = await this.sizesStore.create(this.newSize)
          this.logProduct.idSize = resSize.id
          this.sizesStore.get()
        }
        else {
          this.logProduct.idSize = this.sizeInput.value.id
        } 
        if(typeof this.colorInput.value === 'string' || this.colorInput instanceof String) {
          this.newColor = {
            name: this.colorInput.value
          }
          const resColor = await this.colorsStore.create(this.newColor)
          this.logProduct.idColor = resColor.id
          this.colorsStore.get()
        }
        else {
          this.logProduct.idColor = this.colorInput.value.id
        } 
      }
      else if (this.data.typeform == 1) {
        this.logProduct.idSize = this.data.productSizeColor.idSize
        this.logProduct.idColor = this.data.productSizeColor.idColor
      }

      this.productsStore.addItemOfProduct(this.logProduct).subscribe(() => {
        this.dialogRef.close(true)
      }, (error: HttpErrorResponse) => {
        if(error.status == 400) {
          this.toastr.error("Something went wrong!")
          this.dialogRef.close(false)
        }
      })
      
    }
  }

  checkValidate() : boolean {
    var isValidate: boolean = true
    if (this.data.typeform == 0) {
      if(this.sizeInput.value === null || this.colorInput.value == null) {
        this.toastr.error("Please fill in all the required fields.")
        isValidate = false
      }  
    }
    else if (this.data.typeform == 1) {
      if(this.logProduct.quantity <= 0) {
        this.toastr.error("Please enter quantity.")
        isValidate = false
      }
    }
    
    return isValidate
  }

  quantityValidate() {
    if (this.logProduct.quantity < 0) {
      this.logProduct.quantity = 0
    }
    else if (this.logProduct.quantity > 200) {
      this.logProduct.quantity = 200
    }
  }

  checkTypeForm() {
    if (this.data.typeform == 1) {
      this.sizeInput.disable()
      this.colorInput.disable()

      this.sizeInput.setValue(this.data.productSizeColor.size, {
        emitModelToViewChange: true
      })

      this.colorInput.setValue(this.data.productSizeColor.color, {
        emitModelToViewChange: true
      })

    }
  }
}
