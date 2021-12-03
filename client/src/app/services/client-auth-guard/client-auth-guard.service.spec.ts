import { TestBed } from '@angular/core/testing';

import { ClientAuthGuard } from './client-auth-guard.service';

describe('ClientAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientAuthGuard = TestBed.get(ClientAuthGuard);
    expect(service).toBeTruthy();
  });
});
