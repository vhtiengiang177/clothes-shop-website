import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { DataService } from '../data.service';
import { FilterParamsCategories } from 'src/app/services/model/category/filter-params-categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DataService {

  constructor(http: HttpClient) { 
    super('/categories', http)
  }

  // get(params) {
  //   return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllCategories" + this.convertToQueryStringCategories(params))
  //     .pipe(catchError((error: Response) => {
  //       if(error.status == 400)
  //         return throwError(new BadRequestError(error))
  //       return throwError(new AppError(error))
  //     }))
  // }

  convertToQueryStringCategories(filterParams: FilterParamsCategories): string {
    const cloneParams = { ...filterParams };
    let query = '?';

    query+= this.convertToQueryString(cloneParams)

    return query;
  }

  delete(categoryId) {
    return this.http.put(GlobalConstants.apiUrl + "/categories" + "/DeleteCategory/" + categoryId, categoryId,
    {
      headers: this.authorizationHeader()
    })
  }

  addImageCategory(file,idCategory) {
    let headers = this.authorizationHeader()
    headers = headers.append('Content-Disposition', 'mulipart/form-data');

    return this.http.post(GlobalConstants.apiUrl + this.routeAPI + "/AddImageCategory/"+idCategory, file, {
      headers: headers,
      responseType: "text"
    })
  }
}
