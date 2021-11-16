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
  currentRouter: string

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd ){
        this.currentRouter = event.url;
        if(this.currentRouter == "/admin/products")
          this.clickProductsList()
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
    this.isProductsListActive = false
  }

  clickProductsList() {
    this.isProductShow = true
    this.isProductsListActive = true
    // false
    this.isDashboardActive = false
  }
}
