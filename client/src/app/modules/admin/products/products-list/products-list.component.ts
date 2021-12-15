import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { FilterParamsProduct } from 'src/app/services/model/product/filter-params-product.model';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  
  filter: FilterParamsProduct = {
    pageindex: 1,
    pagesize: 5,
    sort: null
  };
  static readonly addForm = 0;
  static readonly editForm = 1;


  constructor(private productsStore: ProductsStoreService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router) {
      this.fetchData()
    }

  ngOnInit() {
  }

  onPaginate(pageEvent: PageEvent) {
    this.filter.pagesize = +pageEvent.pageSize;
    this.filter.pageindex = +pageEvent.pageIndex + 1;
    this.fetchData()
  }

  fetchData() {
    this.productsStore.getAll(this.filter);
  }

  deleteProduct(productId) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to delete the product",
        id: productId
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.productsStore.delete(productId).subscribe(() => {
          this.toastr.success("Delete product #" + productId + " successfully")
          let totalStore = this.productsStore.products.length;
          if(totalStore == 1) {
            this.filter.pageindex = this.filter.pageindex - 1;
            this.paginator.pageIndex = this.filter.pageindex - 1;
          }
          this.fetchData()
        }, (error: HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("Bad Request")
          }
          else if (error.status == 404) {
            this.toastr.error("Not found product #" + productId)
          }
        })
      }
    });
  }

  addProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '500px',
      data: { 
        typeform: ProductsListComponent.addForm, 
        product: { }
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        // if(this.filter.sort == null && this.filter.pageindex == 1) {
        //   this.productsStore.products.splice(this.filter.pagesize - 1,1);
        //   this.productsStore.products.splice(0,0,res);
        //   this.productsStore.totalData = this.productsStore.totalData + 1;
        // }
        // else {
        //   this.filter = {
        //     pageindex: 1,
        //     pagesize: this.filter.pagesize,
        //     sort: null
        //   }
        //   this.fetchData()
        // }
        // this.paginator.pageIndex = 0;
        this.router.navigate(['admin/products/' + res.id])
      }
    });
  }

  editProduct(idProduct) {
    if(!this.productsStore.products.find(p => p.id == idProduct)) {
      this.toastr.error("Cannot find the product #" + idProduct)
    }
    else {
      this.productsStore.getById(idProduct).subscribe(res => {
        if(res) {
          const dialogRef = this.dialog.open(ProductFormComponent, {
            width: '500px',
            data: { 
              typeform: ProductsListComponent.editForm, 
              product: res
            }
          });
          
          dialogRef.afterClosed().subscribe(res => {
            if(res) {
              var index = this.productsStore.products.findIndex(p => p.id == res.id)
              this.productsStore.products.splice(index, 1, res)
            }
          });
        }
      })
    }
  }

  reloadProduct() {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      sort: this.filter.sort
    }
    this.paginator.pageIndex = 0;
    this.fetchData()
  }

  searchEvent($event) {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      sort: this.filter.sort,
      content: $event.content,
      idcategories: $event.idcategories
    }
    this.paginator.pageIndex = 0;

    this.fetchData()
  }

  sortID() {
    if(this.productsStore.totalData !== 0) {
      if(this.filter.sort != 'id:asc') {
        this.filter.sort = 'id:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortName() {
    if(this.productsStore.totalData !== 0) {
      if(this.filter.sort != 'name:asc') {
        this.filter.sort = 'name:asc';
      }
      else {
        this.filter.sort = 'name:desc';
      }
      this.fetchData()
    }
  }

  sortSKU() {
    if(this.productsStore.totalData !== 0) {
      if(this.filter.sort != 'sku:asc') {
        this.filter.sort = 'sku:asc';
      }
      else {
        this.filter.sort = 'sku:desc';
      }
      this.fetchData()
    }
  }

  sortTotalBuy() {
    if(this.productsStore.totalData !== 0) {
      if(this.filter.sort != 'totalbuy:asc') {
        this.filter.sort = 'totalbuy:asc';
      }
      else {
        this.filter.sort = 'totalbuy:desc';
      }
      this.fetchData()
    }
  }

  sortCreatedDate() {
    if(this.productsStore.totalData !== 0) {
      if(this.filter.sort != 'createddate:asc') {
        this.filter.sort = 'createddate:asc';
      }
      else {
        this.filter.sort = 'createddate:desc';
      }
      this.fetchData()
    }
  }

}
