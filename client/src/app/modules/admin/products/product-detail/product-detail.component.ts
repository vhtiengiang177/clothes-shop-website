import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/services/model/product/product.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { ProductSizeColorsStoreService } from 'src/app/services/store/product-size-colors-store/product-size-colors-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';
import { LogproductFormComponent } from '../logproduct-form/logproduct-form.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isVisible = false
  id: number
  product: Product
  static readonly addForm = 0;
  static readonly importForm = 1;
  static readonly deleteForm = 2;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productsStore: ProductsStoreService,
    private categoriesStore: CategoriesStoreService,
    private productSizeColorsStore: ProductSizeColorsStoreService,
    private sizesStore: SizesStoreService,
    private colorsStore: ColorsStoreService,
    public dialog: MatDialog) { 
      this.route.params.subscribe((param) => {
        this.id = param['id']
        this.productsStore.getById(param['id']).subscribe(res => {
          this.isVisible = true;
          this.product = res;
          this.product.category = this.categoriesStore.categories.filter(s => s.id == this.product.idCategory).pop().name
          this.fetchItem()
          this.productSizeColorsStore.productitems$.subscribe(res => {
            if (res) {
              this.getNameSizeColor()
            }
          })
        }, (error: HttpErrorResponse) => {
          if(error.status == 404) {
            this.router.navigate(['admin/not-found'])
          }
        })
      })
    }


  ngOnInit() {
  }

  getNameSizeColor() {
    this.productSizeColorsStore.productitems.forEach(item => {
      item.size = this.sizesStore.sizes.filter(s => s.id == item.idSize).pop().name
      item.color = this.colorsStore.colors.filter(c => c.id == item.idColor).pop().name
    })
  }

  fetchItem() {
    this.productSizeColorsStore.get(this.product.id)
  }

  addItem() {
    const dialogRefLog = this.dialog.open(LogproductFormComponent, {
      width: '400px',
      data: {
        typeform: ProductDetailComponent.addForm,
        product: this.product
      }
    });

    dialogRefLog.afterClosed().subscribe(res => {
      if(res) {
        this.fetchItem()
      }
    });
  }

  import(item) {
    const dialogRefLog = this.dialog.open(LogproductFormComponent, {
      width: '400px',
      data: {
        typeform: ProductDetailComponent.importForm,
        product: this.product,
        productSizeColor: item
      }
    });

    dialogRefLog.afterClosed().subscribe(res => {
      if(res) {
        this.fetchItem()
      }
    });
  }

}
