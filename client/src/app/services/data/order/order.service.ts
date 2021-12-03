import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { DataService } from '../data.service';
import { FilterParamsOrders } from '../../model/order/filter-params-orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends DataService{

  constructor(http: HttpClient) { 
    super('/orders', http)
  }

  get(params) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllOrdersByState" + this.convertToQueryStringOrders(params),
    {
      // headers: this.authorizationHeader()
    })
      .pipe(catchError((error: Response) => {
        if(error.status == 400)
          return throwError(new BadRequestError(error))
        return throwError(new AppError(error))
      }))
  }

  convertToQueryStringOrders(filterParams: FilterParamsOrders): string {
    const cloneParams = { ...filterParams };
    let query = '?';

    query+= this.convertToQueryString(cloneParams)

    return query;
  }

  updateState(idState,newState) {
    return this.http.put(GlobalConstants.apiUrl + this.routeAPI + "/UpdateState/" + idState + "/"+ newState, idState,
    {
      // headers: this.authorizationHeader()
    })
  }

  GetAllOrderDetailByOrder(id) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllOrderDetailByOrder/" + id, {
      // headers: this.authorizationHeader()
    })
  }

  createOrder(orderDetail, idAddress) {
    return this.http.post(GlobalConstants.apiUrl + this.routeAPI + "?idAddress=" + idAddress, orderDetail)
  }
}
