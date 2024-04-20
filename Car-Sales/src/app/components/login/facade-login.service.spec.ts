import { TestBed } from '@angular/core/testing';

import { FacadeLoginService } from './facade-login.service';

describe('FacadeLoginService', () => {
  let service: FacadeLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacadeLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
