import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDeliveryListComponent } from './orders-delivery-list.component';

describe('OrdersDeliveryListComponent', () => {
  let component: OrdersDeliveryListComponent;
  let fixture: ComponentFixture<OrdersDeliveryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersDeliveryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersDeliveryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
