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

  constructor(private categoriesStore: CategoriesStoreService,
    private router: Router) { 
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.currentRouter = event.url;
          if (this.currentRouter == "/products")
            this.clickProductsPage()
          else if (this.currentRouter == "/contact")
            this.clickContactPage()
          else if (this.currentRouter == "/login" || this.currentRouter == "/register")
            this.clickLogin()
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
  }

  clickHomePage() {
    this.isHomeActive = true
    this.isProductsActive = false
    this.isContactActive = false
  }

  clickContactPage() {
    this.isContactActive = true
    this.isHomeActive = false
    this.isProductsActive = false
  }

  clickLogin() {
    this.isContactActive = false
    this.isHomeActive = false
    this.isProductsActive = false
  }

}
