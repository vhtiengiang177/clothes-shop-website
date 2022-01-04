import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTotalOrdersComponent } from './chart-total-orders.component';

describe('ChartTotalOrdersComponent', () => {
  let component: ChartTotalOrdersComponent;
  let fixture: ComponentFixture<ChartTotalOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTotalOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTotalOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
