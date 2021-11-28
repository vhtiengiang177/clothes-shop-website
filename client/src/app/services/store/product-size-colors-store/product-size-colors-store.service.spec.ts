import { TestBed } from '@angular/core/testing';

import { ProductSizeColorsStoreService } from './product-size-colors-store.service';

describe('ProductSizeColorsStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSizeColorsStoreService = TestBed.get(ProductSizeColorsStoreService);
    expect(service).toBeTruthy();
  });
});
