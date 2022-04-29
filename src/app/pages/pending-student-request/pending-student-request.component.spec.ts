import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingStudentRequestComponent } from './pending-student-request.component';

describe('PendingStudentRequestComponent', () => {
  let component: PendingStudentRequestComponent;
  let fixture: ComponentFixture<PendingStudentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingStudentRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingStudentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
