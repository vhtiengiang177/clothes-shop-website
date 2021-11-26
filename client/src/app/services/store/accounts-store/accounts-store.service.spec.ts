import { TestBed } from '@angular/core/testing';

import { AccountsStoreService } from './accounts-store.service';

describe('AccountsStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountsStoreService = TestBed.get(AccountsStoreService);
    expect(service).toBeTruthy();
  });
});
