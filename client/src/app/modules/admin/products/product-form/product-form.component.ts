import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ProductForm } from 'src/app/services/model/product/product-form.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { LogproductFormComponent } from '../logproduct-form/logproduct-form.component';
import { ProductsListComponent } from '../products-list/products-list.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('selectCategory', {static: false}) selectCategory: MatSelect;
  
  constructor(public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductForm,
    private categoriesStore: CategoriesStoreService,
    private productsStore: ProductsStoreService,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  next() {
    const dialogRefLog = this.dialog.open(LogproductFormComponent);

    dialogRefLog.afterClosed().subscribe(res => {
      if(res) {
      }
    });
  }

  selectedCategory(selected) {
    this.data.product.categoryId = selected.id;
  }

  // compare category in data with content in select
  compareCategory(c1: {id: number}, c2: {id: number}) {
    return c1 && c2 && c1 === c2;
  }
}
