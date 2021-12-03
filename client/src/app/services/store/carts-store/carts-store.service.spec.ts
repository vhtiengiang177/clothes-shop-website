import { TestBed } from '@angular/core/testing';

import { CartsStoreService } from './carts-store.service';

describe('CartsStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartsStoreService = TestBed.get(CartsStoreService);
    expect(service).toBeTruthy();
  });
});
