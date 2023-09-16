import { TestBed } from '@angular/core/testing';

import { BookmanagerService } from './bookmanager.service';

describe('BookmanagerService', () => {
  let service: BookmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
