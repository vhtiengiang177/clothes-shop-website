import { TestBed } from '@angular/core/testing';

import { ShopInfoService } from './shop-info.service';

describe('ShopInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopInfoService = TestBed.get(ShopInfoService);
    expect(service).toBeTruthy();
  });
});
