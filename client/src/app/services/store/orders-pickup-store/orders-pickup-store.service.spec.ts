import { TestBed } from '@angular/core/testing';

import { OrdersPickupStoreService } from './orders-pickup-store.service';

describe('OrdersPickupStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersPickupStoreService = TestBed.get(OrdersPickupStoreService);
    expect(service).toBeTruthy();
  });
});
