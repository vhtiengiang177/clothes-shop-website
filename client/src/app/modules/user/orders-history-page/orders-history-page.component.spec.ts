import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersHistoryPageComponent } from './orders-history-page.component';

describe('OrdersHistoryPageComponent', () => {
  let component: OrdersHistoryPageComponent;
  let fixture: ComponentFixture<OrdersHistoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersHistoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
