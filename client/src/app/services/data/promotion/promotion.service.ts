import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { DataService } from '../data.service';
import { FilterParamsPromotions } from '../../model/promotion/filter-params-promotions.model';
import { FilterProductOption } from '../../model/product/filter-product-options.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService extends DataService{

  constructor(http: HttpClient) { 
    super('/promotions', http)
  }

  get(params) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllPromotions" + this.convertToQueryStringPromotions(params),
    {
      headers: this.authorizationHeader()
    })
      .pipe(catchError((error: Response) => {
        if(error.status == 400)
          return throwError(new BadRequestError(error))
        return throwError(new AppError(error))
      }))
  }

  convertToQueryStringPromotions(filterParams: FilterParamsPromotions): string {
    const cloneParams = { ...filterParams };
    let query = '?';

    query+= this.convertToQueryString(cloneParams)

    return query;
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

  applyPromotionForAllProduct(params){
    return this.http.put(GlobalConstants.apiUrl + this.routeAPI + "/ApplyPromotionForAllProduct" + this.convertToQueryStringProductPromotion(params),
    {
       headers: this.authorizationHeader()
    })
  }

  deletePromotionForAllProduct(idPromotion){
    return this.http.put(GlobalConstants.apiUrl + this.routeAPI + "/DeletePromotionForAllProduct/" + idPromotion,idPromotion,
    {
       headers: this.authorizationHeader()
    })
  }

  convertToQueryStringProductPromotion(filterParams: FilterProductOption): string {
    const cloneParams = { ...filterParams };
    let query = '?';
  
    if (cloneParams.idCategories) {
      cloneParams.idCategories.forEach((categoryId) => {
        query += `idCategories=${categoryId}&`;
      });
    }
    delete cloneParams.idCategories;

    query+= this.convertToQueryString(cloneParams)

    return query;
  }

  getPromotionsEffective(){
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetPromotionsEffective" ,
    {
      headers: this.authorizationHeader()
    })
      .pipe(catchError((error: Response) => {
        if(error.status == 400)
          return throwError(new BadRequestError(error))
        return throwError(new AppError(error))
      }))
  }

  addImagePromotion(file,idPromotion) {
    let headers = this.authorizationHeader()
    headers = headers.append('Content-Disposition', 'mulipart/form-data');

    return this.http.post(GlobalConstants.apiUrl + this.routeAPI + "/AddImagePromotion/"+idPromotion, file, {
      headers: headers,
      responseType: "text"
    })
  }

  getAllPromotions(){
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllPromotionsNotFilter" ,
    {
      headers: this.authorizationHeader()
    })
      .pipe(catchError((error: Response) => {
        if(error.status == 400)
          return throwError(new BadRequestError(error))
        return throwError(new AppError(error))
      }))
  }
}
