import { Component, OnInit } from '@angular/core';
import { PromotionsStoreService } from 'src/app/services/store/promotions-store/promotions-store.service';

@Component({
  selector: 'app-promotion-page',
  templateUrl: './promotion-page.component.html',
  styleUrls: ['./promotion-page.component.css']
})
export class PromotionPageComponent implements OnInit {

  constructor(private promotionsStore: PromotionsStoreService) { }

  ngOnInit() {
  }

}
