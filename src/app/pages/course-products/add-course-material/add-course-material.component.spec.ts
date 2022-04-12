import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseMaterialComponent } from './add-course-material.component';

describe('AddCourseMaterialComponent', () => {
  let component: AddCourseMaterialComponent;
  let fixture: ComponentFixture<AddCourseMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
