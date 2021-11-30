import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/services/model/product/image.model';
import { Product } from 'src/app/services/model/product/product.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { ProductSizeColorsStoreService } from 'src/app/services/store/product-size-colors-store/product-size-colors-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {
  id: number
  isVisible: boolean
  product: Product
  listImages: Image[]

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productsStore: ProductsStoreService,
    private categoriesStore: CategoriesStoreService,
    private productSizeColorsStore: ProductSizeColorsStoreService,
    private sizesStore: SizesStoreService,
    private colorsStore: ColorsStoreService) { 
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
            this.router.navigate(['/not-found'])
          }
        })
      })
  }

  ngOnInit() {
  }

  fetchItem() {
    this.productSizeColorsStore.get(this.product.id)
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
}
