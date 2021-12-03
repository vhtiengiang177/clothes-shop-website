import { TestBed } from '@angular/core/testing';

import { OrdersDeliveryStoreService } from './orders-delivery-store.service';

describe('OrdersDeliveryStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersDeliveryStoreService = TestBed.get(OrdersDeliveryStoreService);
    expect(service).toBeTruthy();
  });
});
