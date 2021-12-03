import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersApprovalListComponent } from './orders-approval-list.component';

describe('OrdersApprovalListComponent', () => {
  let component: OrdersApprovalListComponent;
  let fixture: ComponentFixture<OrdersApprovalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersApprovalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
