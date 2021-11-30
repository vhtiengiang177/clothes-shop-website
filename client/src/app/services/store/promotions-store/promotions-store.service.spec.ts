import { TestBed } from '@angular/core/testing';

import { PromotionsStoreService } from './promotions-store.service';

describe('PromotionsStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromotionsStoreService = TestBed.get(PromotionsStoreService);
    expect(service).toBeTruthy();
  });
});
