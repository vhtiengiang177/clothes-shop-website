import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsFormComponent } from './shops-form.component';

describe('ShopsFormComponent', () => {
  let component: ShopsFormComponent;
  let fixture: ComponentFixture<ShopsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
