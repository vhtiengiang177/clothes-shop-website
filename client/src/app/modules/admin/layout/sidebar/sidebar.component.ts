import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isDashboardActive: boolean = true
  isProductShow: boolean = false
  isProductsListActive: boolean = false
  isCategoriesListActive: boolean = false

  isAccountShow:boolean = false;
  isCustomerListActive: boolean = false
  isStaffListActive: boolean = false

  isOrdersListActive: boolean = false

  isPromotionsListActive: Boolean =false
  currentRouter: string

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRouter = event.url;
        // if (this.currentRouter == "/admin/products")
        //   this.clickProductsList()
        // else this.clickDashboard()
      }
    });
  }

  ngOnInit() {

  }

  clickProductsNavItem() {
    this.isProductShow = !this.isProductShow
  }

  clickDashboard() {
    this.isDashboardActive = true
    // false
    this.isProductShow = false
    this.isOrdersListActive = false
    this.isPromotionsListActive=false
    this.isAccountShow = false
    //this.isProductsListActive = false
    
  }

  clickProductsList() {
    this.isProductShow = true
    this.isProductsListActive = true
    // false
    this.isDashboardActive = false
    this.isCategoriesListActive = false
    this.isCustomerListActive = false
    this.isStaffListActive = false
    this.isOrdersListActive = false
    this.isPromotionsListActive=false

    this.isAccountShow = false
  }

  clickCategoriesList() {
    this.isProductShow = true
    this.isCategoriesListActive = true
    // false
    this.isDashboardActive = false
    this.isProductsListActive = false      
    this.isCustomerListActive = false
    this.isStaffListActive = false
    this.isOrdersListActive = false
    this.isPromotionsListActive=false

    this.isAccountShow = false
  }

  clickAccountsNavItem() {
    this.isAccountShow = !this.isAccountShow
  }

  clickCustomersList() {
    this.isAccountShow = true
    this.isCustomerListActive = true
    // false
    this.isDashboardActive = false
    this.isProductsListActive = false    
    this.isCategoriesListActive = false
    this.isOrdersListActive = false
    this.isStaffListActive = false
    this.isPromotionsListActive=false

    this.isProductShow = false
  }

  clickStaffList() {
    this.isAccountShow = true
    this.isStaffListActive = true
    // false
    this.isDashboardActive = false
    this.isProductsListActive = false    
    this.isCategoriesListActive = false
    this.isOrdersListActive = false
    this.isCustomerListActive = false
    this.isPromotionsListActive=false

    this.isProductShow = false
  }

  // clickAccountsList() {
  //   this.isAccountShow = true
  //   this.isAccountsListActive = true
  //   // false
  //   this.isDashboardActive = false
  //   this.isProductsListActive = false    
  //   this.isCategoriesListActive = false
  //   this.isOrdersListActive = false

  //   this.isProductShow = false
  //   this.isOrderShow = false
  // }

 

  clickOrdersList() {
    this.isOrdersListActive = true
    // false
    this.isDashboardActive = false
    this.isProductsListActive = false    
    this.isCategoriesListActive = false
    this.isCustomerListActive = false
    this.isStaffListActive = false
    this.isPromotionsListActive=false

    this.isProductShow = false
    this.isAccountShow = false
  }

  clickPromotionsList() {
    this.isPromotionsListActive=true
    // false
    this.isDashboardActive = false
    this.isProductsListActive = false    
    this.isCategoriesListActive = false
    this.isCustomerListActive = false
    this.isStaffListActive = false
    this.isOrdersListActive = false

    this.isProductShow = false
    this.isAccountShow = false
  }
}
