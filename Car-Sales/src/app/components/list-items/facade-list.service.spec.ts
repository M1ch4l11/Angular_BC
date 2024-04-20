import { TestBed } from '@angular/core/testing';

import { FacadeListService } from './facade-list.service';

describe('FacadeListService', () => {
  let service: FacadeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacadeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
