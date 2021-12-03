import { TestBed } from '@angular/core/testing';

import { OrderDetailStoreService } from './order-detail-store.service';

describe('OrderDetailStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderDetailStoreService = TestBed.get(OrderDetailStoreService);
    expect(service).toBeTruthy();
  });
});
