import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { OrdersStoreService } from 'src/app/services/store/orders-store/orders-store.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  earning: number = 0
  totalBuy: number = 0
  task: number = 0

  constructor(private orderStore: OrdersStoreService) {
    orderStore.getEarningInDay().subscribe(res => {
      this.earning = res
    })

    orderStore.getTotalBuyProductsInDay().subscribe(res => {
      this.totalBuy = res
    })

    orderStore.getProcessOrder().subscribe(res => {
      this.task = res
    })
    interval(5000).subscribe(x => {
      orderStore.getEarningInDay().subscribe(res => {
        this.earning = res
      })

      orderStore.getTotalBuyProductsInDay().subscribe(res => {
        this.totalBuy = res
      })

      orderStore.getProcessOrder().subscribe(res => {
        this.task = res
      })
    });
  }

  ngOnInit() {
  }


}
