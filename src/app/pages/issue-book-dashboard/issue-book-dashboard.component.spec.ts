import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueBookDashboardComponent } from './issue-book-dashboard.component';

describe('IssueBookDashboardComponent', () => {
  let component: IssueBookDashboardComponent;
  let fixture: ComponentFixture<IssueBookDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueBookDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueBookDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
