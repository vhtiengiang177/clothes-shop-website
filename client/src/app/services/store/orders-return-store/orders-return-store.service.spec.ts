import { TestBed } from '@angular/core/testing';

import { OrdersReturnStoreService } from './orders-return-store.service';

describe('OrdersReturnStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersReturnStoreService = TestBed.get(OrdersReturnStoreService);
    expect(service).toBeTruthy();
  });
});
