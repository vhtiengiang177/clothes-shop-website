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
  //date: any
  //date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private orderService: OrderService) {
    this.monthList = [
      {id: 0, name: 'All months'},
      {id: 1, name: 'January'},
      {id: 2, name: 'Febrary'},
      {id: 3, name: 'March'},
      {id: 4, name: 'April'},
      {id: 5, name: 'May'},
      {id: 6, name: 'June'},
      {id: 7, name: 'July'},
      {id: 8, name: 'August'},
      {id: 9, name: 'September'},
      {id: 10, name: 'October'},
      {id: 11, name: 'November'},
      {id: 12, name: 'December'}
    ];

    this.yearList = [
    {id: 0, name: 'View by day'},
    {id: 1, name:'View by month'},
    {id: 2, name:'View by year'}
    ]
   
  
  
    this.orderService.getDataChartAmount(1).subscribe(p=>{
      this.dataAmount = p;
    })
   }

  ngOnInit() {
    this.orderService.getDataChartAmount(1).subscribe(p=>{
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
        min: 10
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
      { data: [ 100000,200000,400000,500000,100000,700000,400000], label: 'Total Amount' }
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
      this.barChartData.labels = [ '2020','2021']
    }
    // Only Change 3 values
    console.log(this.dataAmount);
    
    this.barChartData.datasets[0].data =this.dataAmount;

    this.chart.update();
  }

  UpdateYM() {
   //this.date= new Date().toLocaleDateString();
  }

  getFromDateToDate(){
    let curr = new Date; // get current date
    let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    let last = first + 6; // last day is the first day + 6

     this.firstDate = new Date(curr.setDate(first));
     this.lastdate = new Date(curr.setDate(last))
  }

  ClickView() {
    console.log(this.view);
    
    this.orderService.getDataChartAmount(this.view).subscribe(p=>{
      this.dataAmount = p;
      this.updateChart(this.view);
    })
  }
}
