import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	navbarIsOpen: boolean = false;

  constructor() { 
  	this.navbarIsOpen = false;
  }

  ngOnInit() {

  }

  toggleNavbar(e){
  	this.navbarIsOpen = !this.navbarIsOpen;
  }
}
