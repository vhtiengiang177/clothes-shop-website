import { TestBed } from '@angular/core/testing';

import { LogProductService } from './log-product.service';

describe('LogProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogProductService = TestBed.get(LogProductService);
    expect(service).toBeTruthy();
  });
});
