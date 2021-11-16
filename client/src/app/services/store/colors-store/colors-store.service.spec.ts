import { TestBed } from '@angular/core/testing';

import { ColorsStoreService } from './colors-store.service';

describe('ColorsStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorsStoreService = TestBed.get(ColorsStoreService);
    expect(service).toBeTruthy();
  });
});
