import { TestBed } from '@angular/core/testing';

import { RealticAccountService } from './realtic-account.service';

describe('RealticAccountService', () => {
  let service: RealticAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealticAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
