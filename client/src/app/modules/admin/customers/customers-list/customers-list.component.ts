import { AccountsStoreService } from 'src/app/services/store/accounts-store/accounts-store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FilterParamsAccounts } from 'src/app/services/model/account/filter-params-accounts.model';
import { CustomersStoreService } from 'src/app/services/store/customers-store/customers-store.service';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { CustomerDetailFormComponent } from '../customer-detail-form/customer-detail-form.component';
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


  
  blockAccount(idAccount) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to block the customer",
        id: idAccount  
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.accountsStore.block(idAccount).subscribe(() => {
          this.toastr.success("Block customer #" + idAccount + " successfully")
          let totalStore = this.accountsStore.accounts.length;
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
            this.toastr.error("Not found customer #" + idAccount)
          }
        })
      }
    });
  }

  unblockAccount(idAccount) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to unblock the customer",
        id: idAccount,
        
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.accountsStore.unblock(idAccount).subscribe(() => {
          this.toastr.success("Unblock customer #" + idAccount + " successfully")
          let totalStore = this.accountsStore.accounts.length;
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
            this.toastr.error("Not found customer #" + idAccount)
          }
        })
      }
    });
  }

  deleteAccount(idAccount) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to delete the customer",
        id: idAccount
        
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.accountsStore.delete(idAccount).subscribe(() => {
          this.toastr.success("Delete customer #" + idAccount + " successfully")
          let totalStore = this.accountsStore.accounts.length;
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
            this.toastr.error("Not found account #" + idAccount)
          }
        })
      }
    });
  }

  viewDetail(id) {
    if (!this.customersStore.acccustomer.find(p => p.id == id)) {
      this.toastr.error("Cannot find the customer #" + id)
    }
    else {
      this.accountsStore.getById(id).subscribe(res2 => {
        this.customersStore.getCustomerById(id).subscribe(res => {
          if (res) {
            const dialogRef = this.dialog.open(CustomerDetailFormComponent, {
              width: '600px',
              data: {
                staff: res,
                account: res2
              }
            });
          }
        })
      })
    }
  }

}
