import { Component, ElementRef, OnInit } from '@angular/core';
import { ShopInfo } from 'src/app/services/model/shop-info/shop-info.model';
import { ShopInfosStoreService } from 'src/app/services/store/shop-infos-store/shop-infos-store.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  shopinfo: ShopInfo = {
    address: "",
    phone: "",
    email: ""
  }
  address: string = ""
  dynamic_address: string;

  constructor(private shopInfosStore: ShopInfosStoreService, private hostElement: ElementRef,) {
    this.getShopInfos()
   }

  ngOnInit() {
  }

  getShopInfos() {
    this.shopInfosStore.shopinfos$.subscribe(res => {
      if(res.length != 0) {
        this.shopinfo = res[0]
        
        this.address = this.shopinfo.address + ", " + this.shopinfo.wards + ", " + this.shopinfo.district + ", " + this.shopinfo.province + "."
        // this.dynamic_address = "https://maps.google.com/maps?q=" + encodeURIComponent(this.address) + "&output=embed";
        
        // this.hostElement.nativeElement.querySelector('iframe').src = this.dynamic_address;
        // console.log(this.dynamic_address);
      }
    })
    
  }
}
