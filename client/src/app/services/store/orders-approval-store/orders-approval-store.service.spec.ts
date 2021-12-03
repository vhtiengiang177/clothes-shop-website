import { TestBed } from '@angular/core/testing';

import { OrdersApprovalStoreService } from './orders-approval-store.service';

describe('OrdersApprovalStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersApprovalStoreService = TestBed.get(OrdersApprovalStoreService);
    expect(service).toBeTruthy();
  });
});
