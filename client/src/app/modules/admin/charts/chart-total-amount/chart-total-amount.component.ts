import { Year } from './../../../../services/model/chart/Year.model';
import { Month } from './../../../../services/model/chart/month.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {FormControl} from '@angular/forms';
import { OrderService } from 'src/app/services/data/order/order.service';

@Component({
  selector: 'app-chart-total-amount',
  templateUrl: './chart-total-amount.component.html',
  styleUrls: ['./chart-total-amount.component.css']
})

export class ChartTotalAmountComponent implements OnInit {

  monthList: Month[]=[]
  yearList: Year[]=[]
  date1: Date
  disableSelect:boolean
  lastdate:Date
  firstDate:Date
  dataAmount: number[]=[]
  view: number = 1
  viewYear: number = 2
  //date: any
  //date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private orderService: OrderService) {
    this.yearList = [
      {id: 0, name: '2021'},
      {id: 1, name: '2022'},
    ];

    this.orderService.getDataChartAmount(1,2022).subscribe(p=>{
      this.dataAmount = p;
    })
   }

  ngOnInit() {
    this.orderService.getDataChartAmount(1,2022).subscribe(p=>{
      this.dataAmount = p;
      this.updateChart(1);
    })
    
  }
  
  @ViewChild(BaseChartDirective,{ static: true}) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 50000,
        suggestedMax: '1000000'
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: ['Mon','Tue','Wed','Thur','Fri','Sar','Sun' ],
    datasets: [
      { data: [], label: 'Total Amount', backgroundColor: '#FFCC66', hoverBorderColor:'#FF6633', borderColor:'#FF6633', hoverBackgroundColor:'#FFCC33' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public updateChart(choose): void {
    if (choose == 1)
    {
      this.barChartData.labels = [ 'Mon','Tue','Wed','Thur','Fri','Sar','Sun']
    }
    if (choose == 2)
    {
      this.barChartData.labels = [ 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    }
    if (choose == 3)
    {
      this.barChartData.labels = [ 'Quater 1','Quater 2','Quater 3','Quater 4']
    }
    if (choose == 4)
    {
      this.barChartData.labels = [ '2021','2022']
    }
    // Only Change 3 values
    console.log(this.dataAmount);
    
    this.barChartData.datasets[0].data = this.dataAmount;

    this.chart.update();
  }


  clickView() {
    console.log(this.view);
    
    this.orderService.getDataChartAmount(this.view,this.viewYear).subscribe(p=>{
      this.dataAmount = p;
      this.updateChart(this.view);
    })
  }

  clickViewYear() {
    console.log(this.viewYear);
    
    this.orderService.getDataChartAmount(this.view,this.viewYear).subscribe(p=>{
      this.dataAmount = p;
      this.updateChart(this.view);
    })
  }
}
