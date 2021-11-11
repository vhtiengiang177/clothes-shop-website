import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from '../../data/category/category.service';
import { Category } from '../../model/category/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesStoreService {

  private readonly _categories = new BehaviorSubject<Category[]>([]);

  readonly categories$ = this._categories.asObservable();

  constructor(private categoryService: CategoryService, private toastr: ToastrService) {
    this.get()
   }

  get categories() : Category[] {
    return this._categories.value;
  }

  set categories(val:Category[]) {
    this._categories.next(val);
  }

  async get(){
    await this.categoryService.get()
            .subscribe(res => this.categories = res,
              () => {
                this.toastr.error("An unexpected error occurred.", "List Categories")
              });
  }
}
