import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartsStoreService } from 'src/app/services/store/carts-store/carts-store.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  isUserInformation: boolean = false
  numOfCart: number = 0

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService : AuthService,
    private cartStore: CartsStoreService) {
      this.cartStore.carts$.subscribe(res => {
        if (res && this.numOfCart != res.length) {
          this.fetchCart()
          this.numOfCart = res.length
        }
      })
     }

  ngOnInit() {
  }

  logout() {
    this.isUserInformation = false
    this.authService.logout()
    
    //this.fetchCart()
    if(this.route.snapshot['_routerState'].url != '/')    
      this.router.navigate(['/']);
  }

  clickUserInformation() {
    this.isUserInformation = !this.isUserInformation
  }

  fetchCart() {
    this.cartStore.get()
  }
}
