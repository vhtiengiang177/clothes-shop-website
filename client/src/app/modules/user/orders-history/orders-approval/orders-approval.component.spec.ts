import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersApprovalComponent } from './orders-approval.component';

describe('OrdersApprovalComponent', () => {
  let component: OrdersApprovalComponent;
  let fixture: ComponentFixture<OrdersApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
