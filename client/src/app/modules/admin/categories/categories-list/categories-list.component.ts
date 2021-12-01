import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { FilterParamsCategories } from 'src/app/services/model/category/filter-params-categories.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { CategoriesFormComponent } from '../categories-form/categories-form.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
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

  searchEvent(content) {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      sort: this.filter.sort,
      content: content
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

  addCategory() {
    const dialogRef = this.dialog.open(CategoriesFormComponent, {
      width: '500px',
      data: { 
        typeform: CategoriesListComponent.addForm, 
        category: { }
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        if(this.filter.sort == null && this.filter.pageindex == 1) {
          this.categoriesStore.categories.splice(this.filter.pagesize - 1,1);
          this.categoriesStore.categories.splice(0,0,res);
          this.categoriesStore.totalData = this.categoriesStore.totalData + 1;
        }
        else {
          this.filter = {
            pageindex: 1,
            pagesize: this.filter.pagesize,
            sort: null
          }
          this.fetchData()
        }
        this.paginator.pageIndex = 0;
      }
    });
  }

  editCategory(idCategory) {
    if(!this.categoriesStore.categories.find(p => p.id == idCategory)) {
      this.toastr.error("Cannot find the category #" + idCategory)
    }
    else {
      this.categoriesStore.getById(idCategory).subscribe(res => {
        if(res) {
          const dialogRef = this.dialog.open(CategoriesFormComponent, {
            width: '500px',
            data: { 
              typeform: CategoriesListComponent.editForm, 
              category: res
            }
          });
          
          dialogRef.afterClosed().subscribe(res => {
            if(res) {
              var index = this.categoriesStore.categories.findIndex(p => p.id == res.id)
              this.categoriesStore.categories.splice(index, 1, res)
            }
          });
        }
      })
    }
  }


  deleteCategory(idCategory) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to delete the categoy",
        id: idCategory,
        remindtext: "Warning: When delete the category, system will delete all products of category"
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.categoriesStore.delete(idCategory).subscribe(() => {
          this.toastr.success("Delete category #" + idCategory + " successfully")
          let totalStore = this.categoriesStore.categories.length;
          if(totalStore == 1) {
            this.filter.pageindex = this.filter.pageindex - 1;
            this.paginator.pageIndex = this.filter.pageindex - 1;
          }
          this.fetchData()
        }, (error: HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("Bad Request")
          }
          else if (error.status == 404) {
            this.toastr.error("Not found category #" + idCategory)
          }
        })
      }
    });
  }
}
