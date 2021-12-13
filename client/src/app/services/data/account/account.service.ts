import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { Account } from '../../model/account/account.model';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends DataService{

  constructor(http: HttpClient) { 
    super("/accounts", http)
  }

  updateAccount(account) {
    return this.http.patch<Account>(GlobalConstants.apiUrl + '/accounts/updateaccount/' + account.id, account)
    .pipe(catchError((error: Response) => {
      if(error.status == 400)
        return throwError(new BadRequestError(error))
      return throwError(new AppError(error))
    }))
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

  getAccountInfo(accountId) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAccountInfo/" + accountId, {
      headers: this.authorizationHeader()
    })
  }

  addImageAccount(file) {
    let headers = this.authorizationHeader()
    headers = headers.append('Content-Disposition', 'mulipart/form-data');

    return this.http.post(GlobalConstants.apiUrl + this.routeAPI + "/AddImageAccount", file, {
      headers: headers,
      responseType: "text"
    })
  }

  getById(accountId){
    return this.http.get(GlobalConstants.apiUrl + this.routeAPI + "/GetAccountByID/" + accountId,
    {
      headers: this.authorizationHeader()
    })
  }

  changePassword(params) {
    return this.http.post<any>(GlobalConstants.apiUrl + this.routeAPI + "/ChangePassword", params, {
      headers: this.authorizationHeader()
    })
  }
}
