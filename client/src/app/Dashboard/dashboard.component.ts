import { Component, OnInit } from '@angular/core';
import { ApiService } from './../_services/api/api.service';
import { ApiResponse } from './../_services/apiResponse.interface';

@Component({
    moduleId: module.id,
    selector:'cp-dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    pageTitle: string = "Dashboard"

    plans: Array<Object>

    constructor(private api : ApiService){
    	
    }

    async ngOnInit(){
        let observer = await this.api.get(ApiService.Endpoints.PLANS, []);
        observer.subscribe((response : ApiResponse)=>{
            this.plans = response.data.plans;
        })
    }

    async testGet(){
        let observer = await this.api.get(ApiService.Endpoints.PLANS, []);
        observer.subscribe((response : ApiResponse)=>{
            this.plans = response.data.plans;
            console.log(this.plans)
        })
    }
}
