import { Component } from '@angular/core';

@Component({
  selector: 'app-cp',
  template: `
  <h1>{{pageTitle}}</h1>
  <div>Testing</div>
  <cp-dashboard></cp-dashboard>
  `
})

export class AppComponent {
  pageTitle: string = "UW Course Planner"
}
