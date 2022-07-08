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
      headers: this.authorizationHeader()
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

  updateState(id,newState) {
    return this.http.put(GlobalConstants.apiUrl + this.routeAPI + "/UpdateState/" + id + "/"+ newState, id,
    {
      headers: this.authorizationHeader()
    })
  }

  getAllOrders() {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllOrders" , {
      headers: this.authorizationHeader()
    })
  }

  getAllOrderByState(state) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllOrdersByStateUser/" + state, {
      headers: this.authorizationHeader()
    })
  }
  getAllOrderDetailByOrder(id) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllOrderDetailByOrder/" + id, {
      headers: this.authorizationHeader()
    })
  }

  getAllOrdersByCustomerAndState(idState) {
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetAllOrdersByStateUser/" + idState, {
      headers: this.authorizationHeader()
    })
  }

  createOrder(orderDetail, idAddress, idPromotion, paymentMethod) {
    var params = {
      idAddress,
      idPromotion,
      paymentMethod
    }
    return this.http.post<any>(GlobalConstants.apiUrl + this.routeAPI + "/AddOrder?" + this.convertToQueryString(params) , orderDetail, {
      headers: this.authorizationHeader()
    })
  }

  getEarningInDay() {
    return this.http.get<any>(GlobalConstants.apiUrl + "/admin/dashboard/GetEarningInDay", {
      headers: this.authorizationHeader()
    })
  }

  getTotalBuyProductsInDay() {
    return this.http.get<any>(GlobalConstants.apiUrl + "/admin/dashboard/GetTotalBuyProductsInDay", {
      headers: this.authorizationHeader()
    })
  }

  getTotalBuyProductsInMonth() {
    return this.http.get<any>(GlobalConstants.apiUrl + "/admin/dashboard/GetTotalBuyProductsInMonth", {
      headers: this.authorizationHeader()
    })
  }

  getProcessOrder() {
    return this.http.get<any>(GlobalConstants.apiUrl + "/admin/dashboard/GetProcessOrder", {
      headers: this.authorizationHeader()
    })
  }

  getDataChartAmount(choose,year){
    var params = {
      choose,
      year
    }
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetDataChartAmout?" + this.convertToQueryString(params), {
      headers: this.authorizationHeader()
    })
  }

  getDataChartOrders(choose,year){
    var params = {
      choose,
      year
    }
    return this.http.get<any>(GlobalConstants.apiUrl + this.routeAPI + "/GetDataChartOrders?" + this.convertToQueryString(params), {
      headers: this.authorizationHeader()
    })
  }
}
