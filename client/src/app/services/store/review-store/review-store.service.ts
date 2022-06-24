import { CustomersStoreService } from 'src/app/services/store/customers-store/customers-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { getTestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { Promotion } from '../../model/promotion/promotion.model';
import { PromotionService } from '../../data/promotion/promotion.service';
import { FilterParamsPromotions } from '../../model/promotion/filter-params-promotions.model';
import { Review } from '../../model/review/review.model';
import { ReviewService } from '../../data/review/review.service';
import { CustomerService } from '../../data/customer/customer.service';
@Injectable({
  providedIn: 'root'
})

export class ReviewStoreService {
  private readonly _reviews = new BehaviorSubject<Review[]>([]);

  readonly reviews$ = this._reviews.asObservable();
  private readonly _totalData = new BehaviorSubject<number>(0);

  constructor(private reviewService: ReviewService,
     private productsStoreService:ProductsStoreService,
     private customerService: CustomerService,
     private customerStoreService: CustomersStoreService,
     private toastr: ToastrService) {
    if (this.reviews.length == 0) {
      let filter: FilterParamsPromotions = {};
      this.customerService.getAllCustomer();
    }
   }

   get reviews() : Review[] {
    return this._reviews.value;
  }

  set reviews(val: Review[]) {
    this._reviews.next(val);
  }

  get totalData(): number {
    return this._totalData.getValue();
  }

  set totalData(val: number) {
    this._totalData.next(val);
  }

  async getReviewsOfProduct(idProduct) {
    await this.reviewService.getReviewByProduct(idProduct)
      .subscribe(res => {
        this.reviews = res.data;
        this.totalData = res.totalData;
      },
        (error: AppError) => {
          if (error instanceof BadRequestError)
            this.toastr.error("That's an error", "Bad Request")
          else this.toastr.error("An unexpected error occurred.")
        });
  }


}
