
import { Account } from 'src/app/services/model/account/account.model';
import { FilterParamsAccounts } from 'src/app/services/model/account/filter-params-accounts.model';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { StaffService } from '../../data/staff/staff.service';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';

@Injectable({
  providedIn: 'root'
})
export class StaffStoreService {

  private readonly _accstaff = new BehaviorSubject<Account[]>([]);

  readonly accstaff$ = this._accstaff.asObservable();
  private readonly _totalData = new BehaviorSubject<number>(0);

  constructor(private staffService: StaffService, private toastr: ToastrService) {
    if (this.accstaff.length == 0) {
      let filter: FilterParamsAccounts = {};
      this.getAll(filter);
    }
   }

   get accstaff() : Account[] {
    return this._accstaff.value;
  }

  set accstaff(val: Account[]) {
    this._accstaff.next(val);
  }

  get totalData(): number {
    return this._totalData.getValue();
  }

  set totalData(val: number) {
    this._totalData.next(val);
  }

  async getAll(filterParams: FilterParamsAccounts) {
    await this.staffService.get(filterParams)
      .subscribe(res => {
        this.accstaff = res.data;
        this.totalData = res.totalData;
      },
        (error: AppError) => {
          if (error instanceof BadRequestError)
            this.toastr.error("That's an error", "Bad Request")
          else this.toastr.error("An unexpected error occurred.")
        });
  }

  // create(staffObj) {
  //   let result = new Subject<Promotion>();
  //   this.StaffService.create("/CreateAccount", staffObj).subscribe(res => {
  //     result.next(res)
  //     this.toastr.success("Added successfully", "Staff #" + res.id)
  //   }, (error: AppError) => {
  //     if (error instanceof BadRequestError)
  //       return this.toastr.error("Add staff failed")
  //     else this.toastr.error("An unexpected error occurred.", "Add Staff")
  //   })
  //   return result.asObservable()
  // }

  update(staffObj) {
    return this.staffService.update("/UpdateStaff", staffObj.id, staffObj)
  }
}
