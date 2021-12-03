import { TestBed } from '@angular/core/testing';

import { OrdersCancelledStoreService } from './orders-cancelled-store.service';

describe('OrdersCancelledStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersCancelledStoreService = TestBed.get(OrdersCancelledStoreService);
    expect(service).toBeTruthy();
  });
});
