import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { DeliveryAddress } from 'src/app/services/model/customer/delivery-address.model';
import { Delivery } from 'src/app/services/model/delivery/delivery.model';
import { DeliveryStoreService } from 'src/app/services/store/delivery-store/delivery-store.service';
import { DeliveryAddressFormComponent } from '../delivery-address-form/delivery-address-form.component';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css']
})
export class DeliveryAddressComponent implements OnInit {

  static readonly addForm = 0;
  static readonly editForm = 1;
  static readonly deleteForm = 2;

  listDeliverySelected: DeliveryAddress[] = []
  constructor(private deliveryStore: DeliveryStoreService,public dialog: MatDialog,
    private toastr: ToastrService) {
    this.deliveryStore.deliveryaddress$.subscribe(res => {
      if(res.length == 0) {
        this.deliveryStore.getAllDeliveryAddress()
      }
      else {
        this.deliveryStore.deliveryaddress$.subscribe(res => {
          if (res) {
            this.listDeliverySelected=res;
          }
        })
      }
    })
  }

  ngOnInit() {
  }

  fetchData() {
    this.deliveryStore.getAllDeliveryAddress()
  }


  addDeliveryAddress() {
    const dialogRef = this.dialog.open(DeliveryAddressFormComponent, {
      width: '700px',
      data: { 
        typeform: 0, 
        deliveryaddress : { }
      }
     
      
    });
    console.log();
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.fetchData()
      //   if(this.filter.sort == null && this.filter.pageindex == 1) {
      //     this.promotionsStore.promotions.splice(this.filter.pagesize - 1,1);
      //     this.promotionsStore.promotions.splice(0,0,res);
      //     this.promotionsStore.totalData = this.promotionsStore.totalData + 1;
      //   }
      //   else {
      //     this.filter = {
      //       pageindex: 1,
      //       pagesize: this.filter.pagesize,
      //       sort: null
      //     }
      //     this.fetchData()
      //   }
      //   this.paginator.pageIndex = 0;
      // }
    // });
     }
   });
  }

  editDeliveryAddress(idDeliveryAddress) {
    if(!this.deliveryStore.deliveryaddress.find(p => p.id == idDeliveryAddress)) {
      this.toastr.error("Cannot find the delivery address #" + idDeliveryAddress)
    }
    else {
      this.deliveryStore.getById(idDeliveryAddress).subscribe(res => {
        if(res) {
          const dialogRef = this.dialog.open(DeliveryAddressFormComponent, {
            width: '700px',
            data: { 
              typeform: 1, 
              deliveryaddress: res
            }
          });
          
          dialogRef.afterClosed().subscribe(res => {
            if(res) {
              this.fetchData()
              // var index = this.promotionsStore.promotions.findIndex(p => p.id == res.id)
              // this.promotionsStore.promotions.splice(index, 1, res)
            }
          });
        }
      })
    }
  }

  deleteDeliveryAddress(idDeliveryAddress) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to delete the delivery address",
        id: idDeliveryAddress
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.deliveryStore.delete(idDeliveryAddress).subscribe(() => {
          this.toastr.success("Delete delivery address #" + idDeliveryAddress + " successfully")
          this.fetchData()
        }, (error: HttpErrorResponse) => {
          if(error.status == 400) {
            this.toastr.error("Bad Request")
          }
          else if (error.status == 404) {
            this.toastr.error("Not found delivery address #" + idDeliveryAddress)
          }
        })
      }
    });
  }


  

  

}

