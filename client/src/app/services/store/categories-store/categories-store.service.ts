import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from '../../data/category/category.service';
import { Category } from '../../model/category/category.model';
import { FilterParamsCategories } from 'src/app/services/model/category/filter-params-categories.model';
import { AppError } from 'src/app/_shared/errors/app-error';
import { BadRequestError } from 'src/app/_shared/errors/bad-request-error';
@Injectable({
  providedIn: 'root'
})
export class CategoriesStoreService {

  private readonly _categories = new BehaviorSubject<Category[]>([]);

  readonly categories$ = this._categories.asObservable();
  private readonly _totalData = new BehaviorSubject<number>(0);


  constructor(private categoryService: CategoryService, private toastr: ToastrService) {
    if (this.categories.length == 0) {
      let filter: FilterParamsCategories = {};
      this.getAll(filter);
    }
   }

  get categories() : Category[] {
    return this._categories.value;
  }

  set categories(val:Category[]) {
    this._categories.next(val);
  }

  get totalData(): number {
    return this._totalData.getValue();
  }

  set totalData(val: number) {
    this._totalData.next(val);
  }


  // async get(){
  //   await this.categoryService.get()
  //           .subscribe(res => this.categories = res,
  //             () => {
  //               this.toastr.error("An unexpected error occurred.", "List Categories")
  //             });
  // }

  async getAll(filterParams: FilterParamsCategories) {
    await this.categoryService.get(filterParams)
      .subscribe(res => {
        this.categories = res.data;
        this.totalData = res.totalData;
      },
        (error: AppError) => {
          if (error instanceof BadRequestError)
            this.toastr.error("That's an error", "Bad Request")
          else this.toastr.error("An unexpected error occurred.")
        });
  }
}
