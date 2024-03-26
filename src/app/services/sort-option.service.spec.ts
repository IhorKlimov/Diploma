import { TestBed } from '@angular/core/testing';

import { SortOptionService } from './sort-option.service';

describe('SortOptionService', () => {
  let service: SortOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
