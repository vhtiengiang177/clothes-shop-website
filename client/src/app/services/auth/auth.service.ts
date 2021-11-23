import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { AccountParams } from '../model/account/account-params.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
  }

  login(account) {
    return this.http.post(GlobalConstants.apiUrl + '/authentication', account, { responseType: 'text'})
      .pipe(map(res => {
        if(res){
          localStorage.setItem('token', res);
          return true;
        }
        return false;
      }));
  }

  register(account) {
    return this.http.post(GlobalConstants.apiUrl + '/accounts' + '/createcustomeraccount', account)
  }

  logout(){
    localStorage.removeItem('token');
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
