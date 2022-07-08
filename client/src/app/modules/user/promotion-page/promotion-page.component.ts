import { PromotionService } from './../../../services/data/promotion/promotion.service';
import { Promotion } from 'src/app/services/model/promotion/promotion.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { Product } from 'src/app/services/model/product/product.model';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { Category } from 'src/app/services/model/category/category.model';
import { FilterParamsProduct } from 'src/app/services/model/product/filter-params-product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promotion-page',
  templateUrl: './promotion-page.component.html',
  styleUrls: ['./promotion-page.component.css']
})

export class PromotionPageComponent implements OnInit {
  @ViewChild('paginator', { static: false}) paginator: MatPaginator;
  productTopBestSellers: Product[] = []
  productTopNew: Product[] = []

  removable = true;
  sortSelected = 'name:asc' 
  imgPromotionBanner: string
  lPromotion: Promotion[]=[]
  countVoucher: number
  countPromotion: number
  
  constructor(private productsStore: ProductsStoreService,
    private promotionsStore: PromotionsStoreService,
    private promotionService: PromotionService,
    public dialog: MatDialog,
    private toastr: ToastrService) {
      console.log('length: ',promotionsStore.promotions.length);
      promotionService.getAllPromotions().subscribe(res => {
            this.countVoucher = 0;
            this.countPromotion = 0;
            this.lPromotion = res;
            this.imgPromotionBanner = this.lPromotion.find(p=>p.isMainBanner == 1).image;
            this.countVoucher = this.lPromotion.filter(p=>p.state ==3).length
            this.countPromotion = this.lPromotion.filter(p=>p.state ==2).length
        })
      }
      
  ngOnInit() {
  }
}
