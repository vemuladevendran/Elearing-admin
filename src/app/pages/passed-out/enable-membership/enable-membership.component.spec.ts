import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableMembershipComponent } from './enable-membership.component';

describe('EnableMembershipComponent', () => {
  let component: EnableMembershipComponent;
  let fixture: ComponentFixture<EnableMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnableMembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
