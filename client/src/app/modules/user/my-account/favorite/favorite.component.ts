import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmFormComponent } from 'src/app/modules/common/confirm-form/confirm-form.component';
import { AuthAppService } from 'src/app/services/auth/auth.service';
import { AccountService } from 'src/app/services/data/account/account.service';
import { FavoriteService } from 'src/app/services/data/favorite/favorite.service';
import { Category } from 'src/app/services/model/category/category.model';
import { Favorite } from 'src/app/services/model/favorite/favorite.model';
import { FilterParamsProduct } from 'src/app/services/model/product/filter-params-product.model';
import { ProductSizeColor } from 'src/app/services/model/product/product-size-color.model';
import { Product } from 'src/app/services/model/product/product.model';
import { CategoriesStoreService } from 'src/app/services/store/categories-store/categories-store.service';
import { ColorsStoreService } from 'src/app/services/store/colors-store/colors-store.service';
import { FavoriteStoreService } from 'src/app/services/store/favorite-store/favorite-store.service';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { SizesStoreService } from 'src/app/services/store/sizes-store/sizes-store.service';
import { SharedService } from 'src/app/_shared/constant/share-service';
import { ProductAddCartFormComponent } from '../../product-add-cart-form/product-add-cart-form.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  @ViewChild('paginator', { static: false}) paginator: MatPaginator;

  filter: FilterParamsProduct = {
    pageindex: 1,
    pagesize: 6,
    sort: 'name:asc',
    idcategories: []
  };

  categoriesOptions: Category[] = []
  listProduct: Product[] =[]
  removable = true;
  sortSelected = 'name:asc' 
  minPrice: number;
  maxPrice: number;
  product: Product;
  idCustomer: number

  constructor(private productsStore: ProductsStoreService,
    private categoriesStore: CategoriesStoreService,
    private authService: AuthAppService,
    private favoriteService: FavoriteService,
    private favoriteStore: FavoriteStoreService,
    public dialog: MatDialog,
    private toastr: ToastrService) {
      this.productsStore.getFavoriteProducts().subscribe(p => {
        this.listProduct = p
        this.listProduct.forEach(pc => {
          pc.isFavorite = true
          var categories = this.categoriesStore.categories.filter(c => c.id == pc.idCategory)
          pc.imageUrl = "assets/product.jpg"
          this.productsStore.getImagesByIdProduct(pc.id).subscribe(res => {
            if (res.length != 0) {
              if (res[0].url) {
                pc.imageUrl = res[0].url 
              }
            }
          })
          if(categories.length == 1) {
            pc.category = categories[0].name
          }
        });
    })

    //  if (this.productsStore.products.length!=0){
    //   this.productsStore.products.forEach(product =>{
    //     this.product = product
    //     this.product.isFavorite = true
    //     this.favoriteService.getAllItemsInFavorite().subscribe(res => {
    //       if (res.length != 0){
    //         let favorite: Favorite[]=[]
    //         favorite = res;
    //         favorite.forEach(favorite => {
    //           if (favorite.idProduct ==  this.product.id){
    //             this.product.isFavorite = true
                
    //           }
    //         })
    //       }
    //     });
    //   })
    //  } else {
    //   this.fetchData()
    //  }
       
          
      
    //   this.fetchFavorite()
    //   if(this.productsStore.products.length != 6) {
    //     this.fetchData()
    //   }
  }

  ngOnInit() {
  }

  onPaginate(pageEvent: PageEvent) {
    this.filter.pagesize = +pageEvent.pageSize;
    this.filter.pageindex = +pageEvent.pageIndex + 1;
    this.fetchData()
  }

  fetchData() {
    this.productsStore.getProductsForClientPage(this.filter);
  }

  fetchFavorite(){
    this.favoriteStore.getAllItemsInFavorite()
  }

  sort() {
    if (this.sortSelected != this.filter.sort) {
      this.filter.sort = this.sortSelected
      this.fetchData()
    }
  }

  getProductByCategory(value) {
    if(this.categoriesOptions.indexOf(value) == -1) {
      this.categoriesOptions.push(value)
      this.filter.idcategories.push(value.id)
      this.filter.pageindex = 1
      this.paginator.pageIndex = 0;
      this.fetchData()
    }
  }

  remove(value: Category): void {
    const index = this.categoriesOptions.indexOf(value);

    if (index >= 0) {
      this.categoriesOptions.splice(index, 1);
      this.filter.idcategories.splice(index, 1);
      this.filter.pageindex = 1
      this.paginator.pageIndex = 0;
      this.fetchData()
    }
  }

  filterPrice() {
    if (this.minPrice > this.maxPrice && (this.maxPrice != null || this.minPrice != null)) {
      this.toastr.warning("Minimum price should not be greater than maximum")
    }
    else {
      if (this.minPrice < 0 || this.maxPrice < 0) {
        this.toastr.warning("Minimum/Maximum price should be at least 0 VND")
      }
      else if (this.minPrice >= 0 || this.maxPrice >= 0) {
        this.filter.minprice = this.minPrice
        this.filter.maxprice = this.maxPrice
        this.filter.pageindex = 1
        this.paginator.pageIndex = 0;
        this.fetchData()
      }
      else this.toastr.warning("Minimum/Maximum price should be at least 0 VND")
    }
  }

  searchEvent(value) {
    this.filter.pageindex = 1
    this.filter.content = value

    this.paginator.pageIndex = 0;

    this.fetchData()
  }

  reloadProduct() {
    this.minPrice = null
    this.maxPrice = null
    this.categoriesOptions = []
    this.filter = {
      pageindex: 1,
      pagesize: this.filter.pagesize,
      sort: this.filter.sort
    }
    this.paginator.pageIndex = 0;
    this.fetchData()
  }

  addToCart(product) {
    console.log(product.id);
    
    this.dialog.open(ProductAddCartFormComponent, {
      width: '800px',
      data: { 
        idProduct: product.id,
        idColor: null,
        idSize: null
      }
    });
  }

 
  deleteFavorite(idProduct) {
      this.favoriteService.deleteItemInFavorite(idProduct).subscribe(() => {
        this.fetchFavorite();
        this.listProduct = this.listProduct.filter(item => item.id !=idProduct)
      }, (e: HttpErrorResponse) => {
        if (e.status == 400)
          this.toastr.error(e.error)
      })
  }

  deleteAllFavorite() {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      data: {
        text: "Do you want to delete all products in favorite"
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.favoriteService.deleteAllItemsInFavorite(this.authService.getCurrentUser().id).subscribe(() => {
          this.toastr.success("Delete all products successfully")
          this.fetchFavorite();
          this.listProduct =[]
        }, (error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.toastr.error("Not found product")
          }
        })
      }
    });
  }
}
