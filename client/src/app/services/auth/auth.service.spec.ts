import { TestBed } from '@angular/core/testing';

import { AuthAppService } from './auth.service';

describe('AuthAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthAppService = TestBed.get(AuthAppService);
    expect(service).toBeTruthy();
  });
});
