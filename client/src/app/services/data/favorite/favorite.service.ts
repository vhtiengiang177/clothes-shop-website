import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})

export class FavoriteService extends DataService {

  constructor(http: HttpClient) {
    super('/favorites', http)
   }

  deleteItemInFavorite(idProduct) {
    return this.http.post<any>(GlobalConstants.apiUrl + this.routeAPI + "/DeleteItemInFavorite/" +idProduct,idProduct,{
      headers: this.authorizationHeader()
    })
  }

  deleteAllItemsInFavorite(idCustomer) {
    return this.http.post<any>(GlobalConstants.apiUrl + this.routeAPI + "/DeleteAllItemInFavorite/" + idCustomer,idCustomer,{
      headers: this.authorizationHeader()
    })
  }

  addItemInFavorite(idProduct) {
    return this.http.post<any>(GlobalConstants.apiUrl + this.routeAPI + "/AddItemToFavorite/" +idProduct,idProduct,{
      headers: this.authorizationHeader()
    })
  }

  getAllItemsInFavorite() {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllItemsInFavorite" ,
    {
      headers: this.authorizationHeader()
    })
      .pipe(catchError((error: Response) => {
        if(error.status == 400)
          return throwError(new BadRequestError(error))
        return throwError(new AppError(error))
      }))
  }

  getItemFavorite(idProduct) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetFavorite/"+ idProduct,
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
