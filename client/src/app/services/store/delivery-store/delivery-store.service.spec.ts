import { TestBed } from '@angular/core/testing';

import { DeliveryStoreService } from './delivery-store.service';

describe('DeliveryStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeliveryStoreService = TestBed.get(DeliveryStoreService);
    expect(service).toBeTruthy();
  });
});
