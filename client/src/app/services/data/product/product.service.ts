import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllProducts" + this.convertToQueryStringProduct(params), {
      headers: this.authorizationHeader()
    })
      .pipe(catchError((error: Response) => {
        if(error.status == 400)
          return throwError(new BadRequestError(error))
        return throwError(new AppError(error))
      }))
  }

  getProductsForClientPage(params) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetProductsForClientPage" + this.convertToQueryStringProduct(params), {
      headers: this.authorizationHeader()
    })
      .pipe(catchError((error: Response) => {
        if(error.status == 400)
          return throwError(new BadRequestError(error))
        return throwError(new AppError(error))
      }))
  }

  delete(productId) {
    return this.http.put(GlobalConstants.apiUrl + "/products" + "/DeleteProduct/" + productId, productId,
    {
      headers: this.authorizationHeader()
    })
  }

  getTopBestSellers() {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetTopProductBestSellers", {
      headers: this.authorizationHeader()
    })
    .pipe(catchError((error: Response) => {
      if(error.status == 400)
        return throwError(new BadRequestError(error))
      return throwError(new AppError(error))
    }))
  }

  getTopNewProducts() {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetTopNewProducts", {
      headers: this.authorizationHeader()
    })
    .pipe(catchError((error: Response) => {
      if(error.status == 400)
        return throwError(new BadRequestError(error))
      return throwError(new AppError(error))
    }))
  }

  getAllItemOfProduct(id) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllItemOfProduct/" + id, {
      headers: this.authorizationHeader()
    })
  }

  getItemsOfProductForClientPage(id) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetItemsOfProductForClientPage/" + id, {
      headers: this.authorizationHeader()
    })
  }

  addItemOfProduct(log_product: LogProduct) {
    return this.http.post(GlobalConstants.apiUrl + this.routeAPI + "/AddItemOfProduct", log_product, {
      headers: this.authorizationHeader()
    })
  }

  deleteItemOfProduct(psc) {
    return this.http.put(GlobalConstants.apiUrl + this.routeAPI + "/DeleteItemOfProduct", psc, {
      headers: this.authorizationHeader()
    })
  }

  addImageProduct(id, file) {
    let headers = this.authorizationHeader()

    headers = headers.set('Content-Disposition', 'mulipart/form-data');
    console.log(GlobalConstants.apiUrl + this.routeAPI + "/AddImageProduct/" + id);
    
    return this.http.post(GlobalConstants.apiUrl + this.routeAPI + "/AddImageProduct/" + id, file, {
      headers: headers
    }).subscribe(() => {}, error => {
      console.log(error);
      
    })
  }

  getImagesByIdProduct(id) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetImagesByIdProduct/" + id, {
      headers: this.authorizationHeader()
    })
  }

  getItemPSC(psc) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetItemPSC?" + this.convertToQueryString(psc), {
      headers: this.authorizationHeader()
    })
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
