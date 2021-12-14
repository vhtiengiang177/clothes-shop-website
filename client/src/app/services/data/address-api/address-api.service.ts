import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/_shared/constant/global-constant';

@Injectable({
  providedIn: 'root'
})
export class AddressApiService {

  constructor(private http: HttpClient) { }

  getProvice() {
    return this.http.get<any>(GlobalConstants.apiAddressUrl + "/province", {
      headers: this.getHeader()
    })
  }

  getWard(district_id) {
    return this.http.get<any>(GlobalConstants.apiAddressUrl + '/ward', {
      params: {
        district_id
      },
      headers: this.getHeader()
    })
  }

  getDistrict(province_id) {
    return this.http.get<any>(GlobalConstants.apiAddressUrl + '/district', {
      params: {
        province_id
      },
      headers: this.getHeader()
    })
  }

  getHeader() {
    let headers = new HttpHeaders();
    headers = headers.set("Token", "16e67c3e-5d01-11ec-ac64-422c37c6de1b");
    headers = headers.set("Content-Type", "application/json")

    return headers;
  }
}
