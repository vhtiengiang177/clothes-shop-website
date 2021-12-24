import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPickupComponent } from './orders-pickup.component';

describe('OrdersPickupComponent', () => {
  let component: OrdersPickupComponent;
  let fixture: ComponentFixture<OrdersPickupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersPickupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
