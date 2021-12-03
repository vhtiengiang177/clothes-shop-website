import { TestBed } from '@angular/core/testing';

import { OrdersCompletedStoreService } from './orders-completed-store.service';

describe('OrdersCompletedStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersCompletedStoreService = TestBed.get(OrdersCompletedStoreService);
    expect(service).toBeTruthy();
  });
});
