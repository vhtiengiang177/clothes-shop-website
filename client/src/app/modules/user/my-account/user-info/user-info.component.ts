import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AccountService } from 'src/app/services/data/account/account.service';
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
  email: string
  customer: Customer = {}
  staff: Staff = {}
  typeaccount: number
  imageUrl: string = null
  loading: boolean = false
  messageErrorImage: string = ""

  constructor(private authService: AuthService, 
    private accountService: AccountService,
    private sharedService: SharedService,
    private staffStore: StaffStoreService,
    private customerStore: CustomersStoreService,
    private toastr: ToastrService) {
    this.typeaccount = authService.getCurrentUser().idTypeAccount
    accountService.getAccountInfo(authService.getCurrentUser().id).subscribe(res => {
      this.email = res.account.email
      if (this.typeaccount == 4) {
        this.customer = res
        this.imageUrl = this.customer.image
      }
      else {
        this.staff = res
        if(this.staff.image != null) {
          this.imageUrl = this.staff.image
        }
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
    console.log(fileToUpload.type);
    if (fileToUpload.type != "image/jpeg" && fileToUpload.type != "image/png") {
      this.messageErrorImage = "Invalid image file format"
      return
    }
    this.messageErrorImage = ""
    this.loading = true
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.accountService.addImageAccount(formData).subscribe(res => {
      this.imageUrl = res
      this.sharedService.emitChange(this.imageUrl)
      this.loading = false
    })
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
    }
  }

  updateCustomerProfile(formCustomer) {
    if (formCustomer.valid) {
      this.customer.firstName = formCustomer.value.firstName
      this.customer.lastName = formCustomer.value.lastName
      this.customer.idAccount = this.authService.getCurrentUser().id
      
      this.customerStore.update(this.customer).subscribe(res => {
        this.toastr.success("Update profile successfully")
      })
    }
  }

}
