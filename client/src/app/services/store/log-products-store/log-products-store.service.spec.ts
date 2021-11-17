import { TestBed } from '@angular/core/testing';

import { LogProductsStoreService } from './log-products-store.service';

describe('LogProductsStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogProductsStoreService = TestBed.get(LogProductsStoreService);
    expect(service).toBeTruthy();
  });
});
