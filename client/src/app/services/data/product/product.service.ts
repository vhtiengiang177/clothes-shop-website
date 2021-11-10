import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { FilterParamsProduct } from '../../model/product/filter-params-product.model';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DataService {

  constructor(http: HttpClient) { 
    super('/products', http)
  }

  get(params) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + this.convertToQueryStringProduct(params))
      .pipe(catchError((error: Response) => {
        if(error.status == 400)
          return throwError(new BadRequestError(error))
        return throwError(new AppError(error))
        
      }))
  }

  convertToQueryStringProduct(filterParams: FilterParamsProduct): string {
    const cloneParams = { ...filterParams };
    let query = '?';
  
    if (cloneParams.idcategories) {
      cloneParams.idcategories.forEach((categoryId) => {
        query += `idCategories=${categoryId}&`;
      });
    }
    delete cloneParams.idcategories;

    query+= this.convertToQueryString(cloneParams)

    return query;
  }
}
