import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Term } from './../term/term.interface';
import { Plan } from './plan.interface';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})

export class PlanComponent implements OnInit {
  terms: Term[];

  @Input() set plan(plan : Plan){
  	this.plan = plan;
  	this.terms = plan.terms;
  }

  constructor() {
  	// this.terms = [{ id: '1A', courses: [''] }, { id: '1B', courses: [''] }]
  }

  ngOnInit() {
  }

}
