import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { FilterParamsPromotions } from 'src/app/services/model/promotion/filter-params-promotions.model';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';
import { PromotionFormComponent } from '../promotion-form/promotion-form.component';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.css']
})
export class PromotionsListComponent implements OnInit {
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;

  filter: FilterParamsPromotions = {
    pageindex: 1,
    pagesize: 5,
    sort: null
  };

  static readonly addForm = 0;
  static readonly editForm = 1;
  static readonly deleteForm = 2;

  constructor(private promotionsStore: PromotionsStoreService, public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  onPaginate(pageEvent: PageEvent) {
    this.filter.pagesize = +pageEvent.pageSize;
    this.filter.pageindex = +pageEvent.pageIndex + 1;
    this.fetchData()
  }
  
  fetchData() {
    this.promotionsStore.getAll(this.filter);
  }

  reloadPromotion() {
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
    if(this.promotionsStore.totalData !== 0) {
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
    if(this.promotionsStore.totalData !== 0) {
      if(this.filter.sort != 'name:asc') {
        this.filter.sort = 'name:asc';
      }
      else {
        this.filter.sort = 'name:desc';
      }
      this.fetchData()
    }
  }

  sortStartDate() {
    if(this.promotionsStore.totalData !== 0) {
      if(this.filter.sort != 'startdate:asc') {
        this.filter.sort = 'startdate:asc';
      }
      else {
        this.filter.sort = 'startdate:desc';
      }
      this.fetchData()
    }
  }
  
  sortEndDate() {
    if(this.promotionsStore.totalData !== 0) {
      if(this.filter.sort != 'enddate:asc') {
        this.filter.sort = 'enddate:asc';
      }
      else {
        this.filter.sort = 'enddate:desc';
      }
      this.fetchData()
    }
  }

  sortValue() {
    if(this.promotionsStore.totalData !== 0) {
      if(this.filter.sort != 'value:asc') {
        this.filter.sort = 'value:asc';
      }
      else {
        this.filter.sort = 'value:desc';
      }
      this.fetchData()
    }
  }

  addPromotion() {
    const dialogRef = this.dialog.open(PromotionFormComponent, {
      width: '500px',
      data: { 
        typeform: PromotionsListComponent.addForm, 
        promotion: { }
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        if(this.filter.sort == null && this.filter.pageindex == 1) {
          this.promotionsStore.promotions.splice(this.filter.pagesize - 1,1);
          this.promotionsStore.promotions.splice(0,0,res);
          this.promotionsStore.totalData = this.promotionsStore.totalData + 1;
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

  editPromotion(idPromotion) {
    if(!this.promotionsStore.promotions.find(p => p.id == idPromotion)) {
      this.toastr.error("Cannot find the promotion #" + idPromotion)
    }
    else {
      this.promotionsStore.getById(idPromotion).subscribe(res => {
        if(res) {
          const dialogRef = this.dialog.open(PromotionFormComponent, {
            width: '500px',
            data: { 
              typeform: PromotionsListComponent.editForm, 
              promotion: res
            }
          });
          
          dialogRef.afterClosed().subscribe(res => {
            if(res) {
              var index = this.promotionsStore.promotions.findIndex(p => p.id == res.id)
              this.promotionsStore.promotions.splice(index, 1, res)
            }
          });
        }
      })
    }
  }

  

  deletePromotion(idPromotion) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to delete the promotion",
        id: idPromotion
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.promotionsStore.delete(idPromotion).subscribe(() => {
          this.toastr.success("Delete promotion #" + idPromotion + " successfully")
          let totalStore = this.promotionsStore.promotions.length;
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
            this.toastr.error("Not found promotion #" + idPromotion)
          }
        })
      }
    });
  }

}
