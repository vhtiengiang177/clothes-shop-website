import { Account } from './../../../../services/model/account/account.model';
import { Staff } from 'src/app/services/model/staff/staff.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { FilterParamsAccounts } from 'src/app/services/model/account/filter-params-accounts.model';
import { AccountsStoreService } from 'src/app/services/store/accounts-store/accounts-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';
import { StaffAddFormComponent } from '../staff-add-form/staff-add-form.component';
import { StaffDetailFormComponent } from '../staff-detail-form/staff-detail-form.component';
import { StaffFormComponent } from '../staff-form/staff-form.component';

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
  
  getStaff: Staff = {}
  account: Account ={}
 
  constructor(private staffStore: StaffStoreService, public dialog: MatDialog,
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

 
  
  blockAccount(idAccount) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to block the employee",
        id: idAccount,
        
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.accountsStore.block(idAccount).subscribe(() => {
          this.toastr.success("Block employee #" + idAccount + " successfully")
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
            this.toastr.error("Not found employee #" + idAccount)
          }
        })
      }
    });
  }

  unblockAccount(idAccount) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to unblock the employee",
        id: idAccount,
        
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.accountsStore.unblock(idAccount).subscribe(() => {
          this.toastr.success("Unblock employee #" + idAccount + " successfully")
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
            this.toastr.error("Not found employee #" + idAccount)
          }
        })
      }
    });
  }


  deleteAccount(idAccount) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to delete the employee",
        id: idAccount,
        remindtext: "Warning: When delete the employee, the employee will be delete out of system"
        
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.accountsStore.delete(idAccount).subscribe(() => {
          this.toastr.success("Delete employee #" + idAccount + " successfully")
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
            this.toastr.error("Not found employee #" + idAccount)
          }
        })
      }
    });
  }

  AddAccoutStaff() {
    const dialogRef = this.dialog.open(StaffFormComponent, {
      width: '800px',
      data: { 
         account: { },
         staff: { }
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        if(this.filter.sort == null && this.filter.pageindex == 1) {
          this.staffStore.accstaff.splice(this.filter.pagesize - 1,1);
          this.staffStore.accstaff.splice(0,0,res);
          this.staffStore.totalData = this.staffStore.totalData + 1;
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

  ViewDetailStaff(idStaff) {
    if(!this.staffStore.accstaff.find(p => p.id == idStaff)) {
      this.toastr.error("Cannot find the staff #" + idStaff)
    }
    else {
      this.accountsStore.getById(idStaff).subscribe(res2 => {
      this.staffStore.getById(idStaff).subscribe(res => {
        if(res) {
          const dialogRef = this.dialog.open(StaffDetailFormComponent, {
            width: '800px',
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

editStaff(idStaff) {
  if(!this.staffStore.accstaff.find(p => p.id == idStaff)) {
    this.toastr.error("Cannot find the staff #" + idStaff)
  }
  else {
    
    this.staffStore.getById(idStaff).subscribe(res => {
      if(res) {
        this.getStaff= res;
        this.accountsStore.getById(idStaff).subscribe(acc =>{
          if (res){
            this.account = acc;
            this.getStaff.email = this.account.email;
            this.getStaff.typeStaff = this.account.idTypeAccount;
          }
        })
        const dialogRef = this.dialog.open(StaffFormComponent, {
          width: '800px',
          data: { 
            typeform: 1, 
            staff: this.getStaff
          }
        });
        
        dialogRef.afterClosed().subscribe(res => {
          if(res) {
            var index = this.accountsStore.accounts.findIndex(p => p.id == res.id)
            this.accountsStore.accounts.splice(index, 1, res)
          }
        });
      }
    })
  }
}

}
