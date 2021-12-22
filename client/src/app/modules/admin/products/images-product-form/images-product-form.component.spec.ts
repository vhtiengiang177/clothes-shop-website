import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesProductFormComponent } from './images-product-form.component';

describe('ImagesProductFormComponent', () => {
  let component: ImagesProductFormComponent;
  let fixture: ComponentFixture<ImagesProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
