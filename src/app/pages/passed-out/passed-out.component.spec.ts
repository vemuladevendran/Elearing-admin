import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassedOutComponent } from './passed-out.component';

describe('PassedOutComponent', () => {
  let component: PassedOutComponent;
  let fixture: ComponentFixture<PassedOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassedOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassedOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
