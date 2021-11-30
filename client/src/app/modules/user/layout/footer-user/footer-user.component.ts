import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ShopInfo } from 'src/app/services/model/shop-info/shop-info.model';
import { ShopInfosStoreService } from 'src/app/services/store/shop-infos-store/shop-infos-store.service';

@Component({
  selector: 'app-footer-user',
  templateUrl: './footer-user.component.html',
  styleUrls: ['./footer-user.component.css']
})
export class FooterUserComponent implements OnInit {
  shopinfo: ShopInfo
  address: string = ""

  constructor(private shopInfosStore: ShopInfosStoreService) {
    this.getShopInfos()
   }

  ngOnInit() {
  }

  async getShopInfos() {
    const shop = this.shopInfosStore.shopinfos$ 
    shop.subscribe(res => {
      if(res.length != 0) {
        this.shopinfo = res[0]
        console.log(this.shopinfo);
        
        this.address = this.shopinfo.address + ", " + this.shopinfo.wards + ", " + this.shopinfo.district + ", " + this.shopinfo.province + "."
        console.log(this.address);
        
      }
    })
  }

}
