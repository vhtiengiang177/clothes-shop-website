import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { AccountParams } from '../model/account/account-params.model';
import { VerifyResponse } from '../model/account/verify-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
  }

  login(account) {
    return this.http.post<any>(GlobalConstants.apiUrl + '/authentication', account)
      .pipe(map(res => {
        if(res.isVerify){
          localStorage.setItem('token', res.token)
        }
        return res
      }));
  }

  register(account) {
    return this.http.post(GlobalConstants.apiUrl + '/accounts' + '/createcustomeraccount', account)
  }

  logout(){
    localStorage.removeItem('token');
  }

  resendVerificationCode(idAccount) {
    return this.http.get(GlobalConstants.apiUrl + "/authentication/ResendVerificationCode/" + idAccount, { responseType: 'text' })
  }

  verifyAccount(verificationCode, idAccount) {
    return this.http.get(GlobalConstants.apiUrl + "/authentication/VerifyAccount/" + idAccount + "?verificationcode=" + verificationCode, { responseType: 'text'})
    .pipe(map(res => {
      if(res){
        localStorage.setItem('token', res)
        return true
      }
      return false
    }));
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
    if(!token)
      return false;
    return !jwtHelper.isTokenExpired(token);
  }

  getCurrentUser(){
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
    
    return jwtHelper.decodeToken(token);
  }
}
