import { Component, OnInit } from '@angular/core';
import { ApiService } from './../_services/api/api.service';

@Component({
    moduleId: module.id,
    selector:'cp-dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    pageTitle: string = "Dashboard"

    plans: Array<Object>

    constructor(private api : ApiService){
    	this.plans = [{ name: 1 }, { name: 2 }, { name: 3 }]
    }

    ngOnInit(){

    }

    async testGet(){
        (await this.api.get(ApiService.Endpoints.PLANS, [])).subscribe(data=>{
            console.log(data)
        })
    }
}
