import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCancelledComponent } from './orders-cancelled.component';

describe('OrdersCancelledComponent', () => {
  let component: OrdersCancelledComponent;
  let fixture: ComponentFixture<OrdersCancelledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersCancelledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
