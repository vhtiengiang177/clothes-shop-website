import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
import { AccountService } from '../../data/account/account.service';
import { Account } from '../../model/account/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsStoreService {
  private readonly _accounts = new BehaviorSubject<Account[]>([]);

  readonly accounts$ = this._accounts.asObservable();

  constructor(private accountService: AccountService, private toastr: ToastrService) {
    if (this.accounts.length == 0) {
      this.get()
    }
   }

  get accounts() : Account[] {
    return this._accounts.value;
  }

  set accounts(val: Account[]) {
    this._accounts.next(val);
  }

  async get(){
    await this.accountService.get()
            .subscribe(res => this.accounts = res);
  }

  updateAccount(account) {
    let result = new Subject<Account>();
    this.accountService.updateAccount(account)
      .subscribe(res => {
        result.next(res)
      },
        (error: AppError) => {
          if (error instanceof BadRequestError)
            this.toastr.error("That's an error", "Bad Request")
          else this.toastr.error("An unexpected error occurred.")
        })
      return result.asObservable()
  }

  createAccount(accountparams) {
    return this.accountService.createAccount(accountparams)
  }

  delete(id) {
    return this.accountService.delete(id)
  }

  block(id) {
    return this.accountService.block(id)
  }

  unblock(id) {
    return this.accountService.unblock(id)
  }

  getById(id){
    return this.accountService.getById(id)
  }

  changePassword(params) {
    return this.accountService.changePassword(params)
  }

  getByEmail(email){
    return this.accountService.getByEmail(email)
  }
}
