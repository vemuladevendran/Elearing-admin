import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPriceCardComponent } from './membership-price-card.component';

describe('MembershipPriceCardComponent', () => {
  let component: MembershipPriceCardComponent;
  let fixture: ComponentFixture<MembershipPriceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipPriceCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipPriceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
