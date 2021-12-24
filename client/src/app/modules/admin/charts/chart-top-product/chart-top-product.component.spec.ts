import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTopProductComponent } from './chart-top-product.component';

describe('ChartTopProductComponent', () => {
  let component: ChartTopProductComponent;
  let fixture: ComponentFixture<ChartTopProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTopProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTopProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
