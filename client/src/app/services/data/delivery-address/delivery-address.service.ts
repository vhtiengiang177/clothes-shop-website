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
export class DeliveryAddressService extends DataService {

  constructor(http: HttpClient) {
    super('/deliveryaddress', http)
   }

   getAllDeliveryAddress() {
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

  delete(id) {
    return this.http.put(GlobalConstants.apiUrl + "/deliveryaddress" + "/DeleteDeliveryAddress/" + id, id,
    {
      headers: this.authorizationHeader()
    })
  }
}
