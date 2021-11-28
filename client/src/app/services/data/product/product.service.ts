import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { FilterParamsProduct } from '../../model/product/filter-params-product.model';
import { LogProduct } from '../../model/product/log-product.model';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DataService {

  constructor(http: HttpClient) { 
    super('/products', http)
  }

  get(params) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllProducts" + this.convertToQueryStringProduct(params))
      .pipe(catchError((error: Response) => {
        if(error.status == 400)
          return throwError(new BadRequestError(error))
        return throwError(new AppError(error))
      }))
  }

  delete(productId) {
    return this.http.put(GlobalConstants.apiUrl + "/products" + "/DeleteProduct/" + productId, productId)
  }

  getTopBestSellers() {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetTopProductBestSellers")
    .pipe(catchError((error: Response) => {
      if(error.status == 400)
        return throwError(new BadRequestError(error))
      return throwError(new AppError(error))
    }))
  }

  getTopNewProducts() {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetTopNewProducts")
    .pipe(catchError((error: Response) => {
      if(error.status == 400)
        return throwError(new BadRequestError(error))
      return throwError(new AppError(error))
    }))
  }

  getAllItemOfProduct(id) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllItemOfProduct/" + id)
  }

  addItemOfProduct(log_product: LogProduct) {
    return this.http.post(GlobalConstants.apiUrl + this.routeAPI + "/AddItemOfProduct", log_product)
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
