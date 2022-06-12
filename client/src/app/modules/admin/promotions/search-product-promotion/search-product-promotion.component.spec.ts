import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductPromotionComponent } from './search-product-promotion.component';

describe('SearchProductPromotionComponent', () => {
  let component: SearchProductPromotionComponent;
  let fixture: ComponentFixture<SearchProductPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProductPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
