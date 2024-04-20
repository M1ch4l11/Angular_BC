import { TestBed } from '@angular/core/testing';

import { FacadeFormService } from './facade-form.service';

describe('FacadeFormService', () => {
  let service: FacadeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacadeFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
