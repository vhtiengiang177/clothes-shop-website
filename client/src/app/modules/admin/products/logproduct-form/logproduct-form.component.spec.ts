import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogproductFormComponent } from './logproduct-form.component';

describe('LogproductFormComponent', () => {
  let component: LogproductFormComponent;
  let fixture: ComponentFixture<LogproductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogproductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogproductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
