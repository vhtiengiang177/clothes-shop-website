import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { DataService } from '../data.service';
import { FilterParamsPromotions } from '../../model/promotion/filter-params-promotions.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService extends DataService{

  constructor(http: HttpClient) { 
    super('/promotions', http)
  }

  get(params) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllPromotions" + this.convertToQueryStringPromotios(params))
      .pipe(catchError((error: Response) => {
        if(error.status == 400)
          return throwError(new BadRequestError(error))
        return throwError(new AppError(error))
      }))
  }

  convertToQueryStringPromotios(filterParams: FilterParamsPromotions): string {
    const cloneParams = { ...filterParams };
    let query = '?';

    query+= this.convertToQueryString(cloneParams)

    return query;
  }

  delete(promotionId) {
    return this.http.put(GlobalConstants.apiUrl + "/promotions" + "/DeletePromotion/" + promotionId, promotionId)
  }
}
