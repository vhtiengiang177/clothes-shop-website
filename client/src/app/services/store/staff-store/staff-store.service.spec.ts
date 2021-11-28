import { TestBed } from '@angular/core/testing';

import { StaffStoreService } from './staff-store.service';

describe('StaffStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaffStoreService = TestBed.get(StaffStoreService);
    expect(service).toBeTruthy();
  });
});
