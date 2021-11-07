import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(protected routeAPI: string, protected http: HttpClient) { }

  get() {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI)
      .pipe(catchError((res: Response) => {
        if(res.status == 400)
          return throwError(new AppError)
      }))
  }

  authorizationHeader() {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    
    let jwtHelper = new JwtHelperService();

    if (!jwtHelper.isTokenExpired(token))
    {
      headers = headers.set("Authorization", "Bearer " + token);
    }

    return headers;
  }

}
