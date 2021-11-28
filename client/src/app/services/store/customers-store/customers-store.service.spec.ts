import { TestBed } from '@angular/core/testing';

import { CustomersStoreService } from './customers-store.service';

describe('CustomersStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomersStoreService = TestBed.get(CustomersStoreService);
    expect(service).toBeTruthy();
  });
});
