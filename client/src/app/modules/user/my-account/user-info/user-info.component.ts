import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { AuthAppService } from 'src/app/services/auth/auth.service';
import { AccountService } from 'src/app/services/data/account/account.service';
import { Account } from 'src/app/services/model/account/account.model';
import { Customer } from 'src/app/services/model/customer/customer.model';
import { Staff } from 'src/app/services/model/staff/staff.model';
import { CustomersStoreService } from 'src/app/services/store/customers-store/customers-store.service';
import { StaffStoreService } from 'src/app/services/store/staff-store/staff-store.service';
import { SharedService } from 'src/app/_shared/constant/share-service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  account: Account = {}
  oldEmail: string
  customer: Customer = {}
  staff: Staff = {}
  typeaccount: number
  imageUrl: string = "assets/img/profile-default.png"
  oldImageUrl: string
  loading: boolean = false
  messageErrorImage: string = ""
  fileToUploadUpdate: File

  constructor(private authService: AuthAppService, 
    private accountService: AccountService,
    private sharedService: SharedService,
    private staffStore: StaffStoreService,
    private customerStore: CustomersStoreService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router) {
    this.typeaccount = authService.getCurrentUser().idTypeAccount
    accountService.getAccountInfo(authService.getCurrentUser().id).subscribe(res => {
      this.account = res.account
      this.oldEmail = this.account.email
      if (this.typeaccount == 4) {
        this.customer = res
        this.imageUrl = this.customer.image
      }
      else {
        this.staff = res
        if(this.staff.image != null) {
          this.imageUrl = this.staff.image
        }
        this.oldImageUrl = this.imageUrl
      }
      this.sharedService.emitChange(this.imageUrl)
    })
  }

  ngOnInit() {
  }

  public uploadFile = (files) => {
    if (files.length === 0)
      return
    let fileToUpload = <File>files[0];
    if (fileToUpload.type != "image/jpeg" && fileToUpload.type != "image/png") {
      this.messageErrorImage = "Invalid image file format"
      return
    }
    this.messageErrorImage = ""
    this.readFile(fileToUpload)
    this.fileToUploadUpdate = fileToUpload
  }

  readFile(fileToUpload) {
    var reader  = new FileReader()
    reader.onload = (event: Event) => {
      this.imageUrl = reader.result.toString()
    }
    reader.readAsDataURL(fileToUpload);
  }

  updateImage() {
    console.log(this.fileToUploadUpdate);
    
    const formData = new FormData();
    formData.append('file', this.fileToUploadUpdate, this.fileToUploadUpdate.name);
    this.accountService.addImageAccount(formData).subscribe(() => {
      this.sharedService.emitChange(this.imageUrl)
    });
    
    this.sharedService.emitChange(true)
  }

  updateStaffProfile(formStaff) {
    console.log(formStaff);
    if (formStaff.valid) {
      this.staff.firstName = formStaff.value.firstName
      this.staff.lastName = formStaff.value.lastName
      this.staff.dateOfBirth = formStaff.value.dateOfBirth
      this.staff.cardIdentity = formStaff.value.cardIdentity
      this.staff.phone = formStaff.value.phone
      this.staff.idAccount = this.authService.getCurrentUser().id
      
      this.staffStore.update(this.staff).subscribe(res => {
        this.toastr.success("Update profile successfully")
      }, error => {
        this.toastr.error("Something went wrong")
      })

      if (this.oldImageUrl != this.imageUrl)
        this.updateImage()
    }
  }

  updateCustomerProfile(formCustomer) {
    if (formCustomer.valid) {

      this.customer.firstName = formCustomer.value.firstName
      this.customer.lastName = formCustomer.value.lastName
      this.customer.idAccount = this.authService.getCurrentUser().id
      
      this.customerStore.update(this.customer).subscribe(res => {
        if (this.oldEmail != this.account.email) {
          console.log(this.account);
          
          this.accountService.updateAccount(this.account).subscribe(() => {
            const dialogRef = this.dialog.open(ConfirmFormComponent, {
              data: {
                text: "Verify it's you. Sign out",
                remindtext: "You were signed out of your account. Sign in again to continue.",
                buttonOk: true
              }
            })

            dialogRef.afterClosed().subscribe(res => {
              if (res) {
                this.authService.logout()
                this.router.navigate(['/login'])
              }
            })
          }, (error: HttpErrorResponse) => {
            this.toastr.error(error.error)
          })
        }
        else this.toastr.success("Update profile successfully")
      })
      
      if (this.imageUrl != this.oldImageUrl) 
        this.updateImage()
    }
  }

  deleteImage() {
    this.imageUrl = this.oldImageUrl
    // SEND API DELETE IMAGE
  }
}
