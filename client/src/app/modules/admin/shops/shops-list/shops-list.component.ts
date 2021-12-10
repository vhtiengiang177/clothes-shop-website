import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ShopInfo } from 'src/app/services/model/shop-info/shop-info.model';
import { ShopInfosStoreService } from 'src/app/services/store/shop-infos-store/shop-infos-store.service';

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.css']
})
export class ShopsListComponent implements OnInit {

  shopinfo: ShopInfo
  address: string = ""

  constructor(private shopInfosStore: ShopInfosStoreService,
    private toastr: ToastrService) {
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

  UpdateShopInfo(formShopInfo) {
    console.log(formShopInfo);
    if (formShopInfo.valid) {
      this.shopinfo.name = formShopInfo.value.name
      this.shopinfo.datecreate = formShopInfo.value.dateCreate
      this.shopinfo.email = formShopInfo.value.email
      this.shopinfo.phone = formShopInfo.value.phone
      this.shopinfo.wards = formShopInfo.value.wards
      this.shopinfo.wards = formShopInfo.value.wards
      this.shopinfo.district = formShopInfo.value.district
      this.shopinfo.address = formShopInfo.value.address
      this.shopinfo.province = formShopInfo.value.province
      
      this.shopInfosStore.update(this.shopinfo).subscribe(res => {
        this.toastr.success("Update shop's information successfully")
      })
    }
  }
}
