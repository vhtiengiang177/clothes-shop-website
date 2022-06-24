import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { DataService } from '../data.service'

@Injectable({
  providedIn: 'root'
})

export class ReviewService extends DataService{

  constructor(http: HttpClient) { 
    super('/reviews', http)
  }

  delete(promotionId) {
    return this.http.put(GlobalConstants.apiUrl + "/promotions" + "/DeletePromotion/" + promotionId, promotionId,
    {
      headers: this.authorizationHeader()
    })
  }

  applyPromotion(idPromotion,idProduct) {
    return this.http.put(GlobalConstants.apiUrl + this.routeAPI + "/ApplyPromotionForProduct/" + idPromotion + "&&"+ idProduct,idPromotion,
    {
       headers: this.authorizationHeader()
    })
  }

  deleteApplyPromotion(idProduct) {
    return this.http.put(GlobalConstants.apiUrl + this.routeAPI + "/DeletePromotionForProduct/" + idProduct,idProduct,
    {
       headers: this.authorizationHeader()
    })
  }

  getReviewByProduct(idProduct) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/getreviewsbyidproduct/"+idProduct,
    {
      headers: this.authorizationHeader()
    })
  }
}
