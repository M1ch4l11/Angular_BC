import { TestBed } from '@angular/core/testing';

import { FormTemplatesService } from './form-templates.service';

describe('FormTemplatesService', () => {
  let service: FormTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
