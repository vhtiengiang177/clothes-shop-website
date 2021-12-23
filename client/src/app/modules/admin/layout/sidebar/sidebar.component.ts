import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

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

  isPromotionsListActive: Boolean = false
  isShopsActive: Boolean = false

  isOrderShow: Boolean = false;
  isOrdersProcessActive: Boolean = false;
  isOrderApprovalActive: Boolean = false;
  isOrdersDeliveryActive: Boolean = false;
  isOrdersCompletedActive: Boolean = false;
  isOrdersCancelledActive: Boolean = false;
  isOrdersReturnActive: Boolean = false;
  currentRouter: string

  constructor(private router: Router,
    private authService : AuthService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRouter = event.url;
        if (this.currentRouter.startsWith("/admin/products"))
          this.clickProductsList()
        else if (this.currentRouter.startsWith("/admin/categories"))
          this.clickCategoriesList()
        else if (this.currentRouter.startsWith("/admin/customers"))
          this.clickCustomersList()
        else if (this.currentRouter.startsWith("/admin/staffs"))
          this.clickStaffList()
        else if (this.currentRouter.startsWith("/admin/orders"))
          this.clickOrdersList()
        else if (this.currentRouter.startsWith("/admin/promotions"))
          this.clickPromotionsList()
        else if (this.currentRouter.startsWith("/admin/shops"))
          this.clickShops()
        else this.clickDashboard()
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
    this.isShopsActive = false
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
    this.isPromotionsListActive = true
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

  // clickOrdersProcessList()
  // {
  //   this.isOrderShow = true;
  //   this.isOrdersProcessActive = true;
  //   //false
  //   this.isDashboardActive = false
  //   this.isProductsListActive = false    
  //   this.isCategoriesListActive = false
  //   this.isCustomerListActive = false
  //   this.isStaffListActive = false

  //   this.isOrderApprovalActive = false
  //   this.isOrdersDeliveryActive = false    
  //   this.isOrdersCompletedActive = false
  //   this.isOrdersCancelledActive = false
  //   this.isOrdersReturnActive = false
  // }

  // clickOrdersNavItem() {
  //   this.isOrderShow = !this.isOrderShow
  // }

  // clickOrderApprovalList()
  // {
  //   this.isOrderShow = true;
  //   this.isOrderApprovalActive = true;
  //   //false
  //   this.isDashboardActive = false
  //   this.isProductsListActive = false    
  //   this.isCategoriesListActive = false
  //   this.isCustomerListActive = false
  //   this.isStaffListActive = false

  //   this.isOrdersProcessActive = false
  //   this.isOrdersDeliveryActive = false    
  //   this.isOrdersCompletedActive = false
  //   this.isOrdersCancelledActive = false
  //   this.isOrdersReturnActive = false
  // }

  // clickOrdersDeliveryList()
  // {
  //   this.isOrderShow = true;
  //   this.isOrdersDeliveryActive = true;
  //   //false
  //   this.isDashboardActive = false
  //   this.isProductsListActive = false    
  //   this.isCategoriesListActive = false
  //   this.isCustomerListActive = false
  //   this.isStaffListActive = false

  //   this.isOrdersProcessActive = false
  //   this.isOrderApprovalActive = false    
  //   this.isOrdersCompletedActive = false
  //   this.isOrdersCancelledActive = false
  //   this.isOrdersReturnActive = false
  // }

  // clickOrdersCompletedList()
  // {
  //   this.isOrderShow = true;
  //   this.isOrdersCompletedActive = true;
  //   //false
  //   this.isDashboardActive = false
  //   this.isProductsListActive = false    
  //   this.isCategoriesListActive = false
  //   this.isCustomerListActive = false
  //   this.isStaffListActive = false

  //   this.isOrdersProcessActive = false
  //   this.isOrderApprovalActive = false    
  //   this.isOrdersDeliveryActive = false
  //   this.isOrdersCancelledActive = false
  //   this.isOrdersReturnActive = false
  // }

  // clickOrdersCancelledList()
  // {
  //   this.isOrderShow = true;
  //   this.isOrdersCancelledActive = true;
  //   //false
  //   this.isDashboardActive = false
  //   this.isProductsListActive = false    
  //   this.isCategoriesListActive = false
  //   this.isCustomerListActive = false
  //   this.isStaffListActive = false

  //   this.isOrdersProcessActive = false
  //   this.isOrderApprovalActive = false    
  //   this.isOrdersDeliveryActive = false
  //   this.isOrdersCompletedActive = false
  //   this.isOrdersReturnActive = false
  // }

  // clickOrdersReturnList()
  // {
  //   this.isOrderShow = true;
  //   this.isOrdersReturnActive = true;
  //   //false
  //   this.isDashboardActive = false
  //   this.isProductsListActive = false    
  //   this.isCategoriesListActive = false
  //   this.isCustomerListActive = false
  //   this.isStaffListActive = false

  //   this.isOrdersProcessActive = false
  //   this.isOrderApprovalActive = false    
  //   this.isOrdersDeliveryActive = false
  //   this.isOrdersCancelledActive = false
  //   this.isOrdersCompletedActive = false
  // }

  clickShops(){
    this.isShopsActive = true
     // false
    this.isPromotionsListActive = false
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
