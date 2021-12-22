import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPickupListComponent } from './orders-pickup-list.component';

describe('OrdersPickupListComponent', () => {
  let component: OrdersPickupListComponent;
  let fixture: ComponentFixture<OrdersPickupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersPickupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPickupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
