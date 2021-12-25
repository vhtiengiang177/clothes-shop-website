import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTotalAmountComponent } from './chart-total-amount.component';

describe('ChartTotalAmountComponent', () => {
  let component: ChartTotalAmountComponent;
  let fixture: ComponentFixture<ChartTotalAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTotalAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTotalAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
