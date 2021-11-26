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
}
