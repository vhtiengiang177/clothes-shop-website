import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { Image } from 'src/app/services/model/product/image.model';
import { ProductSizeColor } from 'src/app/services/model/product/product-size-color.model';
import { Product } from 'src/app/services/model/product/product.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { ProductSizeColorsStoreService } from 'src/app/services/store/product-size-colors-store/product-size-colors-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';
import { ImagesProductFormComponent } from '../images-product-form/images-product-form.component';
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
  listImages: Image[]
  static readonly addForm = 0;
  static readonly importForm = 1;
  static readonly deleteForm = 2;

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private productsStore: ProductsStoreService,
    private categoriesStore: CategoriesStoreService,
    private productSizeColorsStore: ProductSizeColorsStoreService,
    private sizesStore: SizesStoreService,
    private colorsStore: ColorsStoreService,
    private toastr: ToastrService) { 
      this.route.params.subscribe((param) => {
        this.id = param['id']
        this.productsStore.getById(param['id']).subscribe(res => {
          this.isVisible = true;
          this.product = res;
          this.product.category = this.categoriesStore.categories.filter(s => s.id == this.product.idCategory).pop().name
          this.fetchItem()
          this.getImages(this.product.id)
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

  getImages(id) {
    this.productsStore.getImagesByIdProduct(id).subscribe(res => {
      this.listImages = res
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

  delete(stt,item: ProductSizeColor) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to delete this item",
        id: stt
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        item.color = null
        item.size = null
        this.productsStore.deleteItemOfProduct(item).subscribe(() => {
          this.toastr.success("Delete item successfully")
          this.fetchItem()
        }, (error: HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("Bad Request")
          }
          else if (error.status == 404) {
            this.toastr.error("Not found item at " + stt)
          }
        })
      }
    });
  }

  openImagesForm() {
    const dialogRef = this.dialog.open(ImagesProductFormComponent, {
      data: this.id 
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {

      }
    });
  }
}
