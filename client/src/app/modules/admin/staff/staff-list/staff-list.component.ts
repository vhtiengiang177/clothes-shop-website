import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FilterParamsAccounts } from 'src/app/services/model/account/filter-params-accounts.model';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  filter: FilterParamsAccounts = {
    pageindex: 1,
    pagesize: 5,
    sort: null
  };

  constructor(private staffStore: StaffStoreService, public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  onPaginate(pageEvent: PageEvent) {
    this.filter.pagesize = +pageEvent.pageSize;
    this.filter.pageindex = +pageEvent.pageIndex + 1;
    this.fetchData()
  }
  
  fetchData() {
    this.staffStore.getAll(this.filter);
  }

  reloadAccoutStaff() {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      sort: this.filter.sort
    }
    this.paginator.pageIndex = 0;
    this.fetchData()
  }

  sortID() {
    if(this.staffStore.totalData !== 0) {
      if(this.filter.sort != 'id:asc') {
        this.filter.sort = 'id:asc';
      }
      else {
        this.filter.sort = null;
      }
      this.fetchData()
    }
  }

  sortEmail() {
    if(this.staffStore.totalData !== 0) {
      if(this.filter.sort != 'email:asc') {
        this.filter.sort = 'email:asc';
      }
      else {
        this.filter.sort = 'email:desc';
      }
      this.fetchData()
    }
  }

  sortState() {
    if(this.staffStore.totalData !== 0) {
      if(this.filter.sort != 'state:asc') {
        this.filter.sort = 'state:asc';
      }
      else {
        this.filter.sort = 'state:desc';
      }
      this.fetchData()
    }
  }



}
