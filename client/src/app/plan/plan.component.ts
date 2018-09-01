import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Term } from './../term/term.interface';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})

export class PlanComponent implements OnInit {
  terms: Term[];

  constructor() {
  	this.terms = [{ id: '1A', courses: [''] }, { id: '1B', courses: [''] }]
  }

  ngOnInit() {
  }

}
