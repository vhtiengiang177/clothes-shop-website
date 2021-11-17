import { TestBed } from '@angular/core/testing';

import { SizesStoreService } from './sizes-store.service';

describe('SizesStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SizesStoreService = TestBed.get(SizesStoreService);
    expect(service).toBeTruthy();
  });
});
