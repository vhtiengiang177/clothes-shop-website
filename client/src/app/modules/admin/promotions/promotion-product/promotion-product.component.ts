import { FilterProductPromotion } from './../../../../services/model/promotion/filter-params-product-promotion.model';
import { PromotionService } from './../../../../services/data/promotion/promotion.service';
import { Product } from './../../../../services/model/product/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatGridTileHeaderCssMatStyler, MatPaginator, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { FilterParamsProduct } from 'src/app/services/model/product/filter-params-product.model';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
// import { ProductFormComponent } from 'src/app/modules/admin/products/logproduct-form';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as faker from 'faker';
import { ProductsListComponent } from '../../products/products-list/products-list.component';
import { ProductFormComponent } from '../../products/product-form/product-form.component';
import { Promotion } from 'src/app/services/model/promotion/promotion.model';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-promotion-product',
  templateUrl: './promotion-product.component.html',
  styleUrls: ['./promotion-product.component.css']
})

export class PromotionProductComponent implements OnInit {
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  
  filter: FilterParamsProduct = {
    pageindex: 1,
    pagesize: 5,
    sort: null
  };
  static readonly addForm = 0;
  static readonly editForm = 1;

  importProducts: Product[] = [];
  id: number
  product: Product
  promotion: Promotion
  data: [][];
  filterProductPromotion: FilterProductPromotion

  constructor(private productsStore: ProductsStoreService,
    private promotionsStore: PromotionsStoreService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router) {
      this.fetchData(),
      this.route.params.subscribe((param) => {
        this.id = param['id']
        this.promotionsStore.getById(param['id']).subscribe(res => {
          this.promotion = res;
        }, (error: HttpErrorResponse) => {
          if(error.status == 404) {
            this.router.navigate(['admin/not-found'])
          }
        })
      })
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
      minprice: $event.minprice,
      maxprice: $event.maxprice,
      sort: this.filter.sort,
      content: $event.content,
      idcategories: $event.idcategories
    }

    this.filterProductPromotion = {
      idCategories: $event.idcategories,
      idPromotion: this.promotion.id
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

  sortPrice() {
    if(this.productsStore.totalData !== 0) {
      if(this.filter.sort != 'price:asc') {
        this.filter.sort = 'price:asc';
      }
      else {
        this.filter.sort = 'price:desc';
      }
      this.fetchData()
    }
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported'+ EXCEL_EXTENSION);
  }

  exportAsXLSX():void {
    this.exportAsExcelFile(this.productsStore.products, 'product_data');
  }

  public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

    return data;
  }

  onFileChange(evt: any) {
    const target : DataTransfer =  <DataTransfer>(evt.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log(ws);

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      console.log(this.data);

      let x = this.data.slice(1);
      console.log(x);

    };

    reader.readAsBinaryString(target.files[0]);

    for (var item of this.data){
      let i =1;
      for (var item2 of item)
      {
        if (i==1)
        {
          this.product.sku = item2;
          i++
        }
        if (i==2)
        {
          this.product.name = item2;
          i++
        }  
        if (i==3)
        {
          this.product.description = item2;
          i++
        }  
        if (i==4)
        {
          this.product.unitPrice = item2;
          i++
        }  
        if (i==5)
        {
          this.product.state = item2;
          i++
        }  
        if (i==6)
        {
          this.product.idCategory = item2;
        }  
      }
      this.addProductExcel(this.product);
    }
  }

  addProductExcel(product)
  {
      this.productsStore.create(product).subscribe(res => {
      }, (error:HttpErrorResponse) => {
        if(error.status == 400) {
          this.toastr.error("It looks like something went wrong")
        }
      })
  }

  applyPromotion(idProduct) {
    this.promotionsStore.applyPromotion(this.promotion.id,idProduct).subscribe(() => {
      this.toastr.success("Apply promotion #" + this.promotion.id + " successfully")
      this.fetchData()
    }, (error: HttpErrorResponse) => {
      if(error.status == 500) {
        this.toastr.error("Bad Request")
      }
      else if (error.status == 505) {
        this.toastr.error("Not found product #" + this.promotion.id)
      }
    })
  }

  deleteApplyPromotion(idProduct) {
    this.promotionsStore.deleteApplyPromotion(idProduct).subscribe(() => {
      this.toastr.success("Reject promotion #" + this.promotion.id + " successfully")
      this.fetchData()
    }, (error: HttpErrorResponse) => {
      if(error.status == 500) {
        this.toastr.error("Bad Request")
      }
      else if (error.status == 505) {
        this.toastr.error("Not found product #" + this.promotion.id)
      }
    })
  }

  applyAllOroductPromotion() {
    this.promotionsStore.applyAllProductPromotion(this.filterProductPromotion).subscribe(() => {
      this.toastr.success("Apply promotion #" + this.promotion.id + "for products successfully")
      this.fetchData()
    }, (error: HttpErrorResponse) => {
      if(error.status == 500) {
        this.toastr.error("Bad Request")
      }
      else if (error.status == 505) {
        this.toastr.error("Not found promotion #" + this.promotion.id)
      }
    })
  }

  deletePromotionForAllProduct(idPromotion) {
    this.promotionsStore.deletePromotionForAllProduct(idPromotion).subscribe(() => {
      this.toastr.success("Delete promotion #" + this.promotion.id + " successfully")
      this.fetchData()
    }, (error: HttpErrorResponse) => {
      if(error.status == 500) {
        this.toastr.error("Bad Request")
      }
      else if (error.status == 505) {
        this.toastr.error("Not found product of promotion #" + this.promotion.id)
      }
    })
  }

}
