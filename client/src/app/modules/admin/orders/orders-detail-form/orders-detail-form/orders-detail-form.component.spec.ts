import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDetailFormComponent } from './orders-detail-form.component';

describe('OrdersDetailFormComponent', () => {
  let component: OrdersDetailFormComponent;
  let fixture: ComponentFixture<OrdersDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
