import { Component, OnInit, ViewChild } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material';
import { Category } from 'src/app/services/model/category/category.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }

}
