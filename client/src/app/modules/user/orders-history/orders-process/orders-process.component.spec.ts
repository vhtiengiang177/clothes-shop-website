import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersProcessComponent } from './orders-process.component';

describe('OrdersProcessComponent', () => {
  let component: OrdersProcessComponent;
  let fixture: ComponentFixture<OrdersProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
