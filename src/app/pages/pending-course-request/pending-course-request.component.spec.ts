import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCourseRequestComponent } from './pending-course-request.component';

describe('PendingCourseRequestComponent', () => {
  let component: PendingCourseRequestComponent;
  let fixture: ComponentFixture<PendingCourseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingCourseRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCourseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
