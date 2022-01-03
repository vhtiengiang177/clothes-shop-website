import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-orders-history-page',
  templateUrl: './orders-history-page.component.html',
  styleUrls: ['./orders-history-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersHistoryPageComponent implements OnInit {
  isCancelledEvent: boolean = false

  constructor() { 
     
  }

  ngOnInit() {
    
  }
  
  cancelledEvent(){
    this.isCancelledEvent = !this.isCancelledEvent
  }
 
}
