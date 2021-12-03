import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCancelledListComponent } from './orders-cancelled-list.component';

describe('OrdersCancelledListComponent', () => {
  let component: OrdersCancelledListComponent;
  let fixture: ComponentFixture<OrdersCancelledListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersCancelledListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersCancelledListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
