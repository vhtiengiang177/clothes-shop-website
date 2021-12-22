import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(protected routeAPI: string, protected http: HttpClient) { }

  get(params? : any) {
    if(params != undefined) {
      return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + '?' + this.convertToQueryString(params), {
        headers: this.authorizationHeader()
      })
      .pipe(catchError((error: Response) => {
        if(error.status == 400)
          return throwError(new BadRequestError(error))
        return throwError(new AppError(error))
      }))
    }
    else return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI, {
      headers: this.authorizationHeader()
    })
    .pipe(catchError((error: Response) => {
      if(error.status == 400)
        return throwError(new BadRequestError(error))
      return throwError(new AppError(error))
    }))
  }

  getById(routeName: string, id: number) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + routeName + "/" + id, {
      headers: this.authorizationHeader()
    })
  }

  create(routeName: string, object: any) {
    return this.http.post<any>(GlobalConstants.apiUrl + this.routeAPI + routeName, object, {
      headers: this.authorizationHeader()
    })
  }

  update(routeName: string, id: number, object: any) {
    return this.http.put<any>(GlobalConstants.apiUrl + this.routeAPI + routeName + "/" + id, object, {
      headers: this.authorizationHeader()
    })
  }

  convertToQueryString(params) : string {
    let query = ''
    Object.entries(params).forEach(([key, value]) => {
      if (value != undefined) {
        query += `${key}=${value}&`;
      }
    });
    
    return query
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
