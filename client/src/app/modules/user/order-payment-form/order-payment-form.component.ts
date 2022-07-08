import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import { render } from "creditcardpayments/creditCardPayments";
import { ToastrService } from "ngx-toastr";
import { OrderDetail } from "src/app/services/model/order/order-detail.model";
import { CartsStoreService } from "src/app/services/store/carts-store/carts-store.service";
import { OrdersStoreService } from "src/app/services/store/orders-store/orders-store.service";

@Component({
  selector: "app-order-payment-form",
  templateUrl: "./order-payment-form.component.html",
  styleUrls: ["./order-payment-form.component.css"],
})
export class OrderPaymentFormComponent implements OnInit {
  listOrderDetail: OrderDetail[] = [];
  constructor(public dialogRef: MatDialogRef<OrderPaymentFormComponent>,
    private router: Router,
    private toastr: ToastrService,
    private orderStore: OrdersStoreService,
    private cartsStore: CartsStoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    render({
      id: "#paypalButton",
      currency: "USD",
      value: this.data.value,
      onApprove: () => {
        this.orderStore.create(
            this.data.listOrderDetail,
            this.data.idAddress,
            this.data.idPromotion, 
            1 // pay online
          ).subscribe(() => {
            this.toastr.success("Order successfully!");
            this.cartsStore
              .deleteItemsInCart(this.cartsStore.carts)
              .subscribe(() => {
                this.cartsStore.get();
                this.router.navigate(["/my-orders-history"]);
              });
          });

          this.dialogRef.close()
      }
    });
  }
}
