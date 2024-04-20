import { TestBed } from '@angular/core/testing';
import { GlobalService } from './global-store.service';

describe('GlobalService', () => {
  let service: GlobalService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
