import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FilterParamsProduct } from 'src/app/services/model/product/filter-params-product.model';
import { Product } from 'src/app/services/model/product/product.model';
import { CartsStoreService } from 'src/app/services/store/carts-store/carts-store.service';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { ProductAddCartFormComponent } from '../product-add-cart-form/product-add-cart-form.component';
import * as $ from 'jquery';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  productTopBestSellers: Product[] = []
  productTopNew: Product[] = []
  

  constructor(private productsStore: ProductsStoreService, public dialog: MatDialog,
    private categoriesStore: CategoriesStoreService,
    private cartStore: CartsStoreService) { 
      $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });
      this.cartStore.get()
    this.productsStore.getTopBestSellers().subscribe(p => {
      this.productTopBestSellers = p
      this.productTopBestSellers.forEach(pc => {
        var categories = this.categoriesStore.categories.filter(c => c.id == pc.idCategory)
        if(categories.length == 1) {
          pc.category = categories[0].name
        }
      });
    })

    this.productsStore.getTopNewProducts().subscribe(p => {
      this.productTopNew = p
      this.productTopNew.forEach(pc => {
        var categories = this.categoriesStore.categories.filter(c => c.id == pc.idCategory)
        if(categories.length == 1) {
          pc.category = categories[0].name
        }
      })
    })
  }

  ngOnInit() {
  }

  addToCart(product) {
    const dialogRef = this.dialog.open(ProductAddCartFormComponent, {
      width: '1000px',
      data: { 
        product : product
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        
      }
    });
  }

}
