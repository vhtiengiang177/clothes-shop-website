
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FilterParamsCategories } from 'src/app/services/model/category/filter-params-categories.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  filter: FilterParamsCategories = {
    pageindex: 1,
    pagesize: 5,
    sort: null
  };
  static readonly addForm = 0;
  static readonly editForm = 1;
  static readonly deleteForm = 2;

  constructor(private categoriesStore: CategoriesStoreService, public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
  }
  onPaginate(pageEvent: PageEvent) {
    this.filter.pagesize = +pageEvent.pageSize;
    this.filter.pageindex = +pageEvent.pageIndex + 1;
    this.fetchData()
  }
  fetchData() {
    this.categoriesStore.getAll(this.filter);
  }

  reloadCategory() {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      sort: this.filter.sort
    }
    this.paginator.pageIndex = 0;
    this.fetchData()
  }

  searchEvent($event) {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      sort: this.filter.sort,
      content: $event.content,
    }
    this.paginator.pageIndex = 0;

    this.fetchData()
  }

  sortID() {
    if(this.categoriesStore.totalData !== 0) {
      if(this.filter.sort != 'id:asc') {
        this.filter.sort = 'id:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortName() {
    if(this.categoriesStore.totalData !== 0) {
      if(this.filter.sort != 'name:asc') {
        this.filter.sort = 'name:asc';
      }
      else {
        this.filter.sort = 'name:desc';
      }
      this.fetchData()
    }
  }

  sortModifyDate() {
    if(this.categoriesStore.totalData !== 0) {
      if(this.filter.sort != 'modifydate:asc') {
        this.filter.sort = 'modifydate:asc';
      }
      else {
        this.filter.sort = 'modifydate:desc';
      }
      this.fetchData()
    }
  }
  sortCreatedDate() {
    if(this.categoriesStore.totalData !== 0) {
      if(this.filter.sort != 'createddate:asc') {
        this.filter.sort = 'createddate:asc';
      }
      else {
        this.filter.sort = 'createddate:desc';
      }
      this.fetchData()
    }
  }
}
