import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { DataService } from '../data.service';
import { FilterParamsAccounts } from 'src/app/services/model/account/filter-params-accounts.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerService extends DataService  {

  constructor(http: HttpClient) {
    super('/customers', http)
   }

  get(params) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllAccountCustomers" + this.convertToQueryStringAccounts(params),
    {
      headers: this.authorizationHeader()
    })
      .pipe(catchError((error: Response) => {
        if(error.status == 400)
          return throwError(new BadRequestError(error))
        return throwError(new AppError(error))
      }))
  }

  convertToQueryStringAccounts(filterParams: FilterParamsAccounts): string {
    const cloneParams = { ...filterParams };
    let query = '?';

    query+= this.convertToQueryString(cloneParams)

    return query;
  }

  delete(accountId) {
    return this.http.put(GlobalConstants.apiUrl + this.routeAPI + "/DeleteAccount/" + accountId, accountId,
    {
      headers: this.authorizationHeader()
    })
  }

  block(accountId) {
    return this.http.put(GlobalConstants.apiUrl + this.routeAPI + "/BlockAccount/" + accountId, accountId,
    {
      headers: this.authorizationHeader()
    })
  }

  unblock(accountId) {
    return this.http.put(GlobalConstants.apiUrl + this.routeAPI + "/UnblockAccount/" + accountId, accountId,
    {
      headers: this.authorizationHeader()
    })
  }

  getAllCustomer() {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI,
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
