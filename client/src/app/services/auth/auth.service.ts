import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { map } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
@Injectable({
  providedIn: 'root'
})
export class AuthAppService {

  constructor(private http: HttpClient, private authSocialService: AuthService, private router: Router) { 
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

  sendEmailResetPassword(email) {
    return this.http.get(GlobalConstants.apiUrl + "/authentication/SendEmailResetPassword?email=" + email)
  }

  resetPassword(params) {
    return this.http.post<any>(GlobalConstants.apiUrl + "/authentication/ResetPassword", params)
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

  signInWithGoogle(): void {
    this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      this.http.post(GlobalConstants.apiUrl + '/authentication/LoginWithGoogle', user, {
        responseType: "text"
      }).subscribe(res => {
        localStorage.setItem('token', res)
        this.router.navigate(['/']);
      });
    });
  }
}
