import { TestBed } from '@angular/core/testing';

import { ShopInfosStoreService } from './shop-infos-store.service';

describe('ShopInfosStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopInfosStoreService = TestBed.get(ShopInfosStoreService);
    expect(service).toBeTruthy();
  });
});
