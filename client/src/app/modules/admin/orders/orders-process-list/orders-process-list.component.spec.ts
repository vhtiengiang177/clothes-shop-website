import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersProcessListComponent } from './orders-process-list.component';

describe('OrdersProcessListComponent', () => {
  let component: OrdersProcessListComponent;
  let fixture: ComponentFixture<OrdersProcessListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersProcessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersProcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
