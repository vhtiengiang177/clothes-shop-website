import { Customer } from './../../model/customer/customer.model';
import { Account } from 'src/app/services/model/account/account.model';
import { FilterParamsAccounts } from 'src/app/services/model/account/filter-params-accounts.model';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CustomerService } from '../../data/customer/customer.service';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';

@Injectable({
  providedIn: 'root'
})
export class CustomersStoreService {

  private readonly _acccustomer = new BehaviorSubject<Account[]>([]);
  private readonly _customer = new BehaviorSubject<Customer[]>([]);

  readonly acccustomer$ = this._acccustomer.asObservable();
  readonly customer$ = this._customer.asObservable();
  private readonly _totalData = new BehaviorSubject<number>(0);

  constructor(private customerService: CustomerService, private toastr: ToastrService) {
    if (this.acccustomer.length == 0) {
      let filter: FilterParamsAccounts = {};
      this.getAll(filter);
    }
   }

   get acccustomer() : Account[] {
    return this._acccustomer.value;
  }

  set acccustomer(val: Account[]) {
    this._acccustomer.next(val);
  }

  get customer() : Customer[] {
    return this._customer.value;
  }

  set customer(val: Customer[]) {
    this._customer.next(val);
  }

  get totalData(): number {
    return this._totalData.getValue();
  }

  set totalData(val: number) {
    this._totalData.next(val);
  }

  async getAll(filterParams: FilterParamsAccounts) {
    await this.customerService.get(filterParams)
      .subscribe(res => {
        this.acccustomer = res.data;
        this.totalData = res.totalData;
      },
        (error: AppError) => {
          if (error instanceof BadRequestError)
            this.toastr.error("That's an error", "Bad Request")
          else this.toastr.error("An unexpected error occurred.")
        });
  }

  getById(id) {
    return this.customerService.getById("/GetAccountByID", id)
  }



}
