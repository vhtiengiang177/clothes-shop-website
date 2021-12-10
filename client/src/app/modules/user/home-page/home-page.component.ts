import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Product } from 'src/app/services/model/product/product.model';
import { CartsStoreService } from 'src/app/services/store/carts-store/carts-store.service';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { ProductAddCartFormComponent } from '../product-add-cart-form/product-add-cart-form.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  productTopBestSellers: Product[] = []
  productTopNew: Product[] = []
  images = [
    {path: '../../../../assets/img/carousel/hero-1.png'},
    {path: '../../../../assets/img/carousel/hero-2.png'},
    {path: '../../../../assets/img/carousel/hero-3.png'},
    {path: '../../../../assets/img/carousel/hero-4.jpg'}
  ]
  days: string = ""
  hours: string = ""
  minutes: string = ""
  seconds: string = ""

  constructor(private productsStore: ProductsStoreService, 
    public dialog: MatDialog,
    private categoriesStore: CategoriesStoreService,
    private cartStore: CartsStoreService) { 
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
    var dealDate = new Date('2021-12-31 00:00:00')
    interval(1000).subscribe(x => {
      var today = new Date()
      var newTotalSecsLeft = dealDate.getTime() - today.getTime()
      newTotalSecsLeft = Math.ceil(newTotalSecsLeft / 1000) 
      
      this.days = (Math.floor(newTotalSecsLeft / 60 / 60 / 24)).toString()
      this.hours = (Math.floor(newTotalSecsLeft / 60 / 60) % 24).toString()
      this.minutes = (Math.floor(newTotalSecsLeft / 60) % 60).toString()
      this.seconds = (Math.floor(newTotalSecsLeft) % 60).toString()
    });
  }

  ngOnInit() {}

  addToCart(product) {
    this.dialog.open(ProductAddCartFormComponent, {
      width: '1000px',
      data: { 
        idProduct: product.id,
        idColor: null,
        idSize: null
      }
    });
  }

}
