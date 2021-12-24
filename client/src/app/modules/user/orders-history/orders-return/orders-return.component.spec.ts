import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersReturnComponent } from './orders-return.component';

describe('OrdersReturnComponent', () => {
  let component: OrdersReturnComponent;
  let fixture: ComponentFixture<OrdersReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
