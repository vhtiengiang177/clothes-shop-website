// import { Color } from './../../../../services/model/product/color.model';
import { Year } from './../../../../services/model/chart/Year.model';
import { Month } from './../../../../services/model/chart/month.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType, Color } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {FormControl} from '@angular/forms';
import { OrderService } from 'src/app/services/data/order/order.service';
import { ChartOrders } from 'src/app/services/model/chart/chart-orders.model';

@Component({
  selector: 'app-chart-total-orders',
  templateUrl: './chart-total-orders.component.html',
  styleUrls: ['./chart-total-orders.component.css']
})
export class ChartTotalOrdersComponent implements OnInit {

  monthList: Month[]=[]
  yearList: Year[]=[]
  date1: Date
  disableSelect:boolean
  lastdate:Date
  firstDate:Date
  dataCompleted: number[]=[]
  dataCancelReturn: number[]=[]
  listOrders: ChartOrders
  view: number = 1
  viewYear: number = 2
 
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private orderService: OrderService) {
    this.yearList = [
      {id: 0, name: '2021'},
      {id: 1, name: '2022'},
    ];

    this.orderService.getDataChartOrders(1,2022).subscribe(p=>{
      this.listOrders = p;
      this.dataCompleted = p.ordersCompleted;
      this.dataCancelReturn = p.ordersCancelReturn;
    })
   }

  ngOnInit() {
    this.orderService.getDataChartOrders(1,2022).subscribe(p=>{
      this.dataCompleted =  p.ordersCompleted;
      this.dataCancelReturn = p.ordersCancelReturn;
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
        min: 0,
        suggestedMax: '40'
      }
    },
    plugins: {
      legend: {
        display: true
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
      { data: [], label: 'Completed',
        backgroundColor: '#9de8aa', hoverBorderColor:'#9de8aa', borderColor:'#9de8aa',hoverBackgroundColor:'#84ce90' },
      { data: [], label: 'Cancel/Return',
       backgroundColor: '#ff6b6b', hoverBorderColor:'#ff6b6b', borderColor:'#ff6b6b',hoverBackgroundColor:'#ef3e3e'  },
    ]
  };

  // public barChartColors: Color[] = [
  //   { backgroundColor: 'red' },
  //   { backgroundColor: 'green' },
  // ]

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
    console.log(this.dataCompleted);
    console.log(this.dataCancelReturn);
    
    this.barChartData.datasets[0].data = this.dataCompleted;
    this.barChartData.datasets[1].data = this.dataCancelReturn;
    console.log(this.barChartData.datasets[0].data);
    this.chart.update();
  }

  clickView() {
    console.log(this.view);
    
    this.orderService.getDataChartOrders(this.view,this.viewYear).subscribe(p=>{
      this.dataCompleted = p.ordersCompleted;
      this.dataCancelReturn = p.ordersCancelReturn;
      this.updateChart(this.view);
    })
  }

  clickViewYear() {
    console.log(this.viewYear);

    if ((this.view == 1) && this.viewYear == 1) {
      this.view = 3
    }
    
    this.orderService.getDataChartOrders(this.view,this.viewYear).subscribe(p=>{
      this.dataCompleted = p.ordersCompleted;
      this.dataCancelReturn = p.ordersCancelReturn;
      this.updateChart(this.view);
    })
  }

}
