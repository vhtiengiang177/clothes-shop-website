import { AccountsStoreService } from 'src/app/services/store/accounts-store/accounts-store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FilterParamsAccounts } from 'src/app/services/model/account/filter-params-accounts.model';
import { CustomersStoreService } from 'src/app/services/store/customers-store/customers-store.service';
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  filter: FilterParamsAccounts = {
    pageindex: 1,
    pagesize: 5,
    sort: null
  };

  constructor(private customersStore: CustomersStoreService, public dialog: MatDialog,
    private toastr: ToastrService,
    private accountsStore: AccountsStoreService) { }

  ngOnInit() {
  }

  onPaginate(pageEvent: PageEvent) {
    this.filter.pagesize = +pageEvent.pageSize;
    this.filter.pageindex = +pageEvent.pageIndex + 1;
    this.fetchData()
  }
  
  fetchData() {
    this.customersStore.getAll(this.filter);
  }

  reloadAccoutCustomer() {
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      sort: this.filter.sort
    }
    this.paginator.pageIndex = 0;
    this.fetchData()
  }

  sortID() {
    if(this.customersStore.totalData !== 0) {
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
    if(this.customersStore.totalData !== 0) {
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
    if(this.customersStore.totalData !== 0) {
      if(this.filter.sort != 'state:asc') {
        this.filter.sort = 'state:asc';
      }
      else {
        this.filter.sort = 'state:desc';
      }
      this.fetchData()
    }
  }

  unblockAccount(idAccount) {
    this.accountsStore.unblock(idAccount).subscribe(() => {
      this.toastr.success("Unblock customer #" + idAccount + " successfully")
      this.fetchData()
    }, (error: HttpErrorResponse) => {
      if(error.status == 400) {
        this.toastr.error("Bad Request")
      }
      else if (error.status == 404) {
        this.toastr.error("Not found customer #" + idAccount)
      }
    })
  }

  blockAccount(idAccount) {
    this.accountsStore.block(idAccount).subscribe(() => {
      this.toastr.success("Block customer #" + idAccount + " successfully")
      this.fetchData()
    }, (error: HttpErrorResponse) => {
      if(error.status == 400) {
        this.toastr.error("Bad Request")
      }
      else if (error.status == 404) {
        this.toastr.error("Not found customer #" + idAccount)
      }
    })
  }

}
