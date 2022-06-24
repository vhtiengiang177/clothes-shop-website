import { TestBed } from '@angular/core/testing';

import { ReviewStoreService } from './review-store.service';

describe('ReviewStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewStoreService = TestBed.get(ReviewStoreService);
    expect(service).toBeTruthy();
  });
});
