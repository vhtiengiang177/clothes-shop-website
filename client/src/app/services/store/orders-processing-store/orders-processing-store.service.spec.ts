import { TestBed } from '@angular/core/testing';

import { OrdersProcessingStoreService } from './orders-processing-store.service';

describe('OrdersProcessingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersProcessingStoreService = TestBed.get(OrdersProcessingStoreService);
    expect(service).toBeTruthy();
  });
});
