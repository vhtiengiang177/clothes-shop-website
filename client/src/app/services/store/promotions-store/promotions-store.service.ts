import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { Promotion } from '../../model/promotion/promotion.model';
import { PromotionService } from '../../data/promotion/promotion.service';
import { FilterParamsPromotions } from '../../model/promotion/filter-params-promotions.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionsStoreService {
  private readonly _promotions = new BehaviorSubject<Promotion[]>([]);

  readonly promotions$ = this._promotions.asObservable();
  private readonly _totalData = new BehaviorSubject<number>(0);

  constructor(private promotionService: PromotionService, private toastr: ToastrService) {
    if (this.promotions.length == 0) {
      let filter: FilterParamsPromotions = {};
      this.getAll(filter);
    }
   }

   get promotions() : Promotion[] {
    return this._promotions.value;
  }

  set promotions(val: Promotion[]) {
    this._promotions.next(val);
  }

  get totalData(): number {
    return this._totalData.getValue();
  }

  set totalData(val: number) {
    this._totalData.next(val);
  }

  async getAll(filterParams: FilterParamsPromotions) {
    await this.promotionService.get(filterParams)
      .subscribe(res => {
        this.promotions = res.data;
        this.totalData = res.totalData;
      },
        (error: AppError) => {
          if (error instanceof BadRequestError)
            this.toastr.error("That's an error", "Bad Request")
          else this.toastr.error("An unexpected error occurred.")
        });
  }

  delete(id) {
    return this.promotionService.delete(id)
  }

  create(promotionObj) {
    let result = new Subject<Promotion>();
    this.promotionService.create("/createpromotion", promotionObj).subscribe(res => {
      result.next(res)
      this.toastr.success("Added successfully", "Promotion #" + res.id)
    }, (error: AppError) => {
      if (error instanceof BadRequestError)
        return this.toastr.error("Add promotion failed")
      else this.toastr.error("An unexpected error occurred.", "Add Promotion")
    })
    return result.asObservable()
  }

  update(promotionObj) {
    return this.promotionService.update("/UpdatePromotion", promotionObj.id, promotionObj)
  }

  getById(id) {
    return this.promotionService.getById("/GetPromotionByID", id)
  }

  applyPromotion(idPromotion,idProduct) {
    return this.promotionService.applyPromotion(idPromotion,idProduct)
  }

  deleteApplyPromotion(idProduct) {
    return this.promotionService.deleteApplyPromotion(idProduct)
  }

  applyAllProductPromotion(params){
    return this.promotionService.applyPromotionForAllProduct(params)
  }

  deletePromotionForAllProduct(idPromotion) {
    return this.promotionService.deletePromotionForAllProduct(idPromotion)
  }

  getPromotionsEffective(){
    return this.promotionService.getPromotionsEffective()
  }
}
