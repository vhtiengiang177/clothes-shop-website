import { Order } from './../../../../services/model/order/order.model';
import { OrderService } from './../../../../services/data/order/order.service';
import { Review } from './../../../../services/model/review/review.model';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReviewForm } from 'src/app/services/model/review/review-form.model';
import { ProductService } from 'src/app/services/data/product/product.service';
import { ReviewService } from 'src/app/services/data/review/review.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/services/model/product/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {

  arr: any[] = [];
  index:number = -1;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValueArr: number[]=[]
  selectedValue: number;
  imgProduct: string;
  description: string;
  lProduct: Product[]=[]
  lReview:Review[]=[]
  order: Order = {
    idOrder: 0,
    dateOrder: undefined,
    datePayment: undefined,
    dateShip: undefined,
    dateCancel: undefined,
    totalQuantity: 0,
    totalProductPrice: 0,
    totalAmount: 0,
    feeDelivery: 0,
    idAddress: 0,
    idCustomer: 0,
    state: 0
  }
  commentArr: string[]=[];
  review: Review = { 
    idOrder: 0,
    idProduct: 0,
    comment:'',
    rating: 0
  }

  constructor(public dialogRef: MatDialogRef<ReviewPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReviewForm,
    private productService: ProductService,
    private reviewService: ReviewService,
    private orderService: OrderService,
    private toastr: ToastrService) { 
      this.orderService.getOrderById(data.idOrder).subscribe(res => {
          this.order = res;
          console.log('order:', this.order);

          if (this.order.isFeedback === false){
            this.selectedValueArr.push(5);
            this.commentArr.push('');
          }else{
            this.reviewService.getReviewByOrder(data.idOrder).subscribe(res =>{
              this.lReview = res;
              console.log('list review:', this.lReview);
            })
          }
    
          this.productService.getProductsByIdOrder(data.idOrder).subscribe(res => {
            this.lProduct = res;
            for (let item of this.lProduct) {
              if (true) {
                item.imageUrl = "assets/product.jpg"
                this.productService.getImagesByIdProduct(item.id).subscribe(res => {
                  if (res.length != 0) {
                    if (res[0].url) {
                      item.imageUrl = res[0].url 
                    }
                  }
                });
    
                if (this.order.isFeedback === true){
                  this.review = this.lReview.find(r=>r.idProduct==item.id)
                  console.log('review:', this.review);
                  this.selectedValueArr.push(this.review.rating);
                  this.commentArr.push(this.review.comment);
                }
              }
            }
          });
      })
    }

  ngOnInit() {
  }

  countStar(star,index) {
    this.selectedValueArr[index] = star;
    console.log('Value of star', star);
  }


  save(){
    let index = 0;
    for (let item of this.lProduct){
        this.review.idProduct = item.id;
        this.review.rating = this.selectedValueArr[index];
        this.review.comment = this.commentArr[index];
        this.review.idOrder = this.data.idOrder;
        this.reviewService.addReview(this.review).subscribe(res => {
        }, (error: HttpErrorResponse) => {
          if(error.status == 400) {
            // this.toastr.error("Something went wrong!")
            this.dialogRef.close(false)
          }
        })
        index+=1;
    }
    this.orderService.updateFeedbackOrder(this.data.idOrder).subscribe(res => {
    }, (error: HttpErrorResponse) => {
      if(error.status == 400) {
        this.dialogRef.close(false)
      }
    })
    this.dialogRef.close(true)
    this.toastr.success("Feedback Successfully.");
  }
}
