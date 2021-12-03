import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersReturnListComponent } from './orders-return-list.component';

describe('OrdersReturnListComponent', () => {
  let component: OrdersReturnListComponent;
  let fixture: ComponentFixture<OrdersReturnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersReturnListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersReturnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
