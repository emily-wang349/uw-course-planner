import { Component } from '@angular/core';

@Component({
  selector: 'app-cp',
  template: `
  <cp-dashboard></cp-dashboard>
  `
})

export class AppComponent {
  pageTitle: string = "UW Course Planner"
}
