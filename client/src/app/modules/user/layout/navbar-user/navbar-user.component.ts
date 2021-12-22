import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {
  currentRouter: string
  isHomeActive: boolean = true
  isProductsActive: boolean = false
  isContactActive: boolean = false
  isPromotionActive: boolean = false
  isOpenMenu: string = "none"

  constructor(private categoriesStore: CategoriesStoreService,
    private router: Router) { 


      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.currentRouter = event.url;
          if (this.currentRouter == "/products" || this.currentRouter.includes("/product-detail"))
            this.clickProductsPage()
          else if (this.currentRouter == "/contact")
            this.clickContactPage()
          else if (this.currentRouter == "/login" || this.currentRouter == "/register")
            this.clickLogin()
          else if (this.currentRouter == "/promotions")
            this.clickPromotionPage
          else this.clickHomePage()
        }
      });
    }

  ngOnInit() {
  }

  clickProductsPage() {
    this.isProductsActive = true
    this.isHomeActive = false
    this.isContactActive = false
    this.isPromotionActive = false
  }

  clickHomePage() {
    this.isHomeActive = true
    this.isProductsActive = false
    this.isContactActive = false
    this.isPromotionActive = false
  }

  clickContactPage() {
    this.isContactActive = true
    this.isHomeActive = false
    this.isProductsActive = false
    this.isPromotionActive = false
  }

  clickPromotionPage() {
    this.isPromotionActive = true
    this.isContactActive = false
    this.isHomeActive = false
    this.isProductsActive = false
  }

  clickLogin() {
    this.isContactActive = false
    this.isHomeActive = false
    this.isProductsActive = false
    this.isPromotionActive = false
  }

  clickMenu() {
    if (this.isOpenMenu == "none") 
      this.isOpenMenu = "block"
    else this.isOpenMenu = "none"
  }

}
