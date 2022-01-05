import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { ProductsStoreService } from 'src/app/services/store/products-store/products-store.service';
import { Product } from 'src/app/services/model/product/product.model';

@Component({
  selector: 'app-chart-top-product',
  templateUrl: './chart-top-product.component.html',
  styleUrls: ['./chart-top-product.component.css']
})
export class ChartTopProductComponent implements OnInit {
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective | undefined;

  productTopBestSellers: Product[] = []


  constructor(private productsStore: ProductsStoreService) {
  }

  ngOnInit() {
    this.productsStore.getTopBestSellers().subscribe(p => {
      this.randomize();
    })

  }


  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['1'],
    datasets: [{
      data: [1]
    }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DataLabelsPlugin];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  public randomize(): void {
    let dataLabels: string[] = [];
    let dateQuantity: number[] = [];
    this.productsStore.products.forEach(pc => {
      dataLabels.push(pc.name);
      dateQuantity.push(pc.totalBuy);
    })
    // Only Change 3 values
    this.pieChartData.labels = dataLabels;
    this.pieChartData.datasets[0].data = dateQuantity;

    this.chart.update();
  }

}








