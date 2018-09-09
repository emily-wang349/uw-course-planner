import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../authentication.service';
import { ApiResponse } from './../apiResponse.interface';

let Endpoints = {
	PLANS: '/plans',
	PLAN: '/plans/$1',
	TERMS: '/plans',
	TERM: '/plans/$1/$2',
}

enum Methods {
	GET,
	POST,
	PUT,
	DELETE
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
	private baseUrl : string = 'http://localhost:3000/api';

  constructor(private authService : AuthenticationService, private http : HttpClient) { }

  static get Endpoints(){
  	return Endpoints;
  }

  static get Methods(){
  	return Methods;
  }

  async get(endpoint : string, params : Array<any>, method? : Methods) {
  	let userToken = await this.authService.getCurrentUser();
  	let url = this.baseUrl + ApiService.resolveEndpoint(endpoint, params) + '?user=' + userToken;
  	switch(method){
  		case Methods.POST:

  			break;
  		case Methods.PUT:

  			break;
  		case Methods.DELETE:

  			break;
			default:
  			return this.http.get(url);
  	}
  }

  private static resolveEndpoint(endpoint : string, params : Array<any>) : string{
  	let i = 1;
  	for(let param in params){
  		endpoint = endpoint.replace("$" + i.toString(), param.toString());
  		i++;
  	}
  	return endpoint;
  }
}
