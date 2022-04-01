import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-issue-book-dashboard',
  templateUrl: './issue-book-dashboard.component.html',
  styleUrls: ['./issue-book-dashboard.component.scss']
})
export class IssueBookDashboardComponent implements OnInit {
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
  }

}
