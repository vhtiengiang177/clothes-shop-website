import { TestBed } from '@angular/core/testing';

import { FavoriteStoreService } from './favorite-store.service';

describe('FavoriteStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoriteStoreService = TestBed.get(FavoriteStoreService);
    expect(service).toBeTruthy();
  });
});
