import { TestBed } from '@angular/core/testing';

import { EnroleCourseService } from './enrole-course.service';

describe('EnroleCourseService', () => {
  let service: EnroleCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnroleCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
