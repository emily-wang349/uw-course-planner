import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector:'cp-dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    pageTitle: string = "Dashboard"

    plans: Array<Object>

    constructor(){
    	this.plans = [{ name: 1 }, { name: 2 }, { name: 3 }]
    }

    ngOnInit(){

    }
}
