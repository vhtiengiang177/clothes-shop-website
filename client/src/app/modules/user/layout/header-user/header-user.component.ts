import { Component, OnInit, ViewChild } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Category } from 'src/app/services/model/category/category.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  isUserInformation: boolean = false

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService : AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.isUserInformation = false
    this.authService.logout();
    if(this.route.snapshot['_routerState'].url != '/')    
      this.router.navigate(['/']);
  }

  clickUserInformation() {
    this.isUserInformation = !this.isUserInformation
  }

}
