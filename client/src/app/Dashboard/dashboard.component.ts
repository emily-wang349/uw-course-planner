import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector:'cp-dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {
    pageTitle: string = "Dashboard"

    plans: Object[]

    constructor(){
    	this.plans = [{ name: 1 }, { name: 2 }, { name: 3 }]
    }
}
