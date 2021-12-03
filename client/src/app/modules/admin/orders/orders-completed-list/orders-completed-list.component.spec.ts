import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCompletedListComponent } from './orders-completed-list.component';

describe('OrdersCompletedListComponent', () => {
  let component: OrdersCompletedListComponent;
  let fixture: ComponentFixture<OrdersCompletedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersCompletedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersCompletedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
