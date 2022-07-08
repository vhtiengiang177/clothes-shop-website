import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OrdersCompletedStoreService } from 'src/app/services/store/orders-completed-store/orders-completed-store.service';
import { ReviewPageComponent } from '../../review-page/review-page/review-page.component';
import { OrderDetailUserFormComponent } from '../order-detail-user-form/order-detail-user-form.component';

@Component({
  selector: 'app-orders-completed',
  templateUrl: './orders-completed.component.html',
  styleUrls: ['./orders-completed.component.css']
})
export class OrdersCompletedComponent implements OnInit {

  constructor(private ordersCompletedStore: OrdersCompletedStoreService,
    private dialog: MatDialog) { 
    this.fetchData()
  }

  ngOnInit() {
  }

  fetchData() {
    this.ordersCompletedStore.getAllOrdersByCustomerAndState(5);
  }

  viewDetailOrder(idOrder) {
    const dialogRef = this.dialog.open(OrderDetailUserFormComponent, {
      width: '1000px',
      data: { 
       idOrder: idOrder
      }
    });
  }

  // reviewOrder(item: OrderDetail) {
  //   this.reviewStore.getReviewsOfProduct(item.idProduct);
  //   this.review = this.reviewStore.reviews.find(x=>x.idOrder == item.idOrder && x.idProduct == item.idProduct);
  //   if (this.order.state == 5 && this.review==null){
  //     const dialogRef = this.dialog.open(ReviewPageComponent, {
  //       width: '650px',
  //       data: { 
  //        idOrder: item.idOrder,
  //        idProduct: item.idProduct,
  //        descriptionDetailOrder: item.product + 'x' + item.quantity + item.size + item.color+ 'Total:'+ item.quantity * item.unitPrice + 'VND'
  //       }
  //     });
  //   }
  // }

  reviewOrder(idOrder) {
      const dialogRef = this.dialog.open(ReviewPageComponent, {
        width: '700px',

        data: { 
         idOrder: idOrder,
         idProduct: '',
         descriptionDetailOrder: ''
        }
      });
  }
}
