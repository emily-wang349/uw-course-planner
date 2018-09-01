import { Component, OnInit, Input } from '@angular/core';
import { Term } from './term.interface';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent implements OnInit {
  @Input() term: Term;

  constructor() {
  	
  }

  ngOnInit() {
  }


}
