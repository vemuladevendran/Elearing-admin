import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMembershipPriceComponent } from './add-membership-price.component';

describe('AddMembershipPriceComponent', () => {
  let component: AddMembershipPriceComponent;
  let fixture: ComponentFixture<AddMembershipPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMembershipPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMembershipPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
