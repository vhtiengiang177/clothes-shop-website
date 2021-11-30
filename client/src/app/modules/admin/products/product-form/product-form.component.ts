import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { LogProduct } from 'src/app/services/model/product/log-product.model';
import { ProductForm } from 'src/app/services/model/product/product-form.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('selectCategory', {static: false}) selectCategory: MatSelect;
  logproducts: LogProduct[]
  
  constructor(public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductForm,
    private categoriesStore: CategoriesStoreService,
    private productsStore: ProductsStoreService,
    public dialog: MatDialog,
    private toastr: ToastrService) { 
    }

  ngOnInit() {
    
  }

  save() {
    if (this.checkValidate()) {
      if (this.data.typeform === 0) {
        this.productsStore.create(this.data.product).subscribe(res => {
          this.dialogRef.close(res);
        }, (error:HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("It looks like something went wrong")
          }
        })
      }
      else if (this.data.typeform === 1) {
        this.productsStore.update(this.data.product).subscribe(res => {
          this.dialogRef.close(res)
        }, (error:HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("It looks like something went wrong")
          }
        })
      }
      else this.toastr.warning("It looks like something went wrong")
    }
  }

  checkValidate() {
    if(!this.data.product.sku || !this.data.product.name || !this.data.product.unitPrice || !this.data.product.idCategory) {
      this.toastr.error("Please fill in all the required fields.")
      return false
    }
    return true
  }

  selectedCategory(selected) {
    this.data.product.idCategory = selected.id;
  }

  // compare category in data with content in select
  compareCategory(c1: {id: number}, c2: {id: number}) {
    return c1 && c2 && c1 === c2;
  }
}
