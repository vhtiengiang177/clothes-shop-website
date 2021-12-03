import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddCartFormComponent } from './product-add-cart-form.component';

describe('ProductAddCartFormComponent', () => {
  let component: ProductAddCartFormComponent;
  let fixture: ComponentFixture<ProductAddCartFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAddCartFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddCartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
