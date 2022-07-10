import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Product } from 'src/app/services/model/product/product.model';
import { CartsStoreService } from 'src/app/services/store/carts-store/carts-store.service';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { ProductAddCartFormComponent } from '../product-add-cart-form/product-add-cart-form.component';
import { interval } from 'rxjs';
import { Favorite } from 'src/app/services/model/favorite/favorite.model';
import { AuthAppService } from 'src/app/services/auth/auth.service';
import { FavoriteService } from 'src/app/services/data/favorite/favorite.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FavoriteStoreService } from 'src/app/services/store/favorite-store/favorite-store.service';
import { ToastrService } from 'ngx-toastr';

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
    private favoriteService: FavoriteService,
    private favoriteStore: FavoriteStoreService,
    private authService: AuthAppService,
    private cartStore: CartsStoreService,
    private toastr: ToastrService) { 
      if (this.authService.isLoggedIn() && this.authService.getCurrentUser().idTypeAccount == 4){
        this.cartStore.get()
      }
      
      this.productsStore.getTopBestSellers().subscribe(p => {
        this.productTopBestSellers = p
        this.productTopBestSellers.forEach(pc => {
          var categories = this.categoriesStore.categories.filter(c => c.id == pc.idCategory)
          pc.imageUrl = "assets/product.jpg"
          this.productsStore.getImagesByIdProduct(pc.id).subscribe(res => {
            if (res.length != 0) {
              if (res[0].url) {
                pc.imageUrl = res[0].url 
              }
            }
          })

          pc.isFavorite = false
          if (this.authService.isLoggedIn() && this.authService.getCurrentUser().idTypeAccount == 4){
            let favorite: Favorite
            this.favoriteService.getItemFavorite(pc.id).subscribe(res => {
              favorite = res;
              if (favorite != null){
                  pc.isFavorite=true
                }
            });
            
            };

          if(categories.length == 1) {
            pc.category = categories[0].name
          }
        });
    })

    this.productsStore.getTopNewProducts().subscribe(p => {
      this.productTopNew = p
      this.productTopNew.forEach(pc => {
        var categories = this.categoriesStore.categories.filter(c => c.id == pc.idCategory)
        pc.imageUrl = "assets/product.jpg"
        this.productsStore.getImagesByIdProduct(pc.id).subscribe(res => {
          if (res.length != 0) {
            if (res[0].url) {
              pc.imageUrl = res[0].url 
            }
          }
        })
        
        pc.isFavorite = false
        if (this.authService.isLoggedIn() && this.authService.getCurrentUser().idTypeAccount == 4){
          let favorite: Favorite
          this.favoriteService.getItemFavorite(pc.id).subscribe(res => {
            favorite = res;
            if (favorite != null){
                pc.isFavorite=true
              }
          });
          
          };

        if(categories.length == 1) {
          pc.category = categories[0].name
        }
      })
    })
    var dealDate = new Date('2022-07-30 00:00:00')
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
      width: '800px',
      data: { 
        idProduct: product.id,
        idColor: null,
        idSize: null
      }
    });
  }

  fetchFavorite(){
    this.favoriteStore.getAllItemsInFavorite()
    this.productsStore.getTopBestSellers()
    this.productsStore.getTopNewProducts()
  }

  changeHeart(product,state) {
    if (this.authService.isLoggedIn() && this.authService.getCurrentUser().idTypeAccount == 4){
      if (state === 1){
        this.favoriteService.deleteItemInFavorite(product.id).subscribe(() => {
            this.productTopNew.find(p=>p.id === product.id).isFavorite = false
            this.productTopBestSellers.find(p=>p.id === product.id).isFavorite = false
            this.fetchFavorite();
        }, (e: HttpErrorResponse) => {
          if (e.status == 400)
            this.toastr.error(e.error)
        })} else{
          this.favoriteService.addItemInFavorite(product.id).subscribe(() => {
            this.productTopNew.find(p=>p.id === product.id).isFavorite = true
            this.productTopBestSellers.find(p=>p.id === product.id).isFavorite = true
            this.fetchFavorite();
          }, (e: HttpErrorResponse) => {
            if (e.status == 400)
              this.toastr.error(e.error)
          })
        }
         
    }
  }

}
