import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReviewForm } from 'src/app/services/model/review/review-form.model';
import { ProductService } from 'src/app/services/data/product/product.service';
import { Review } from 'src/app/services/model/review/review.model';
import { ReviewService } from 'src/app/services/data/review/review.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {

  arr: any[] = [];
  index:number = -1;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  imgProduct: string;
  description: string;
  review: Review = { 
    idOrder: 0,
    idProduct: 0,
    comment:'',
    rating: 5
  }

  constructor(public dialogRef: MatDialogRef<ReviewPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReviewForm,
    private productService: ProductService,
    private reviewService: ReviewService) { 
      this.description = data.descriptionDetailOrder;
      this.selectedValue = 5;
      this.imgProduct = "assets/product.jpg"
      this.productService.getImagesByIdProduct(data.idProduct).subscribe(res => {
        if (res.length != 0) {
          if (res[0].url) {
            this.imgProduct = res[0].url 
          }
        }
      });

    }

  ngOnInit() {
  }

  countStar(star) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }

  save(){
    this.review.idOrder = this.data.idOrder;
    this.review.idProduct = this.data.idProduct;
    this.review.rating = this.selectedValue;
  
    this.reviewService.addReview(this.review).subscribe(res => {
      this.dialogRef.close(true)
    }, (error: HttpErrorResponse) => {
      if(error.status == 400) {
        // this.toastr.error("Something went wrong!")
        this.dialogRef.close(false)
      }
    })
  }
}
