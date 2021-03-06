import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../_services/authentication.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule} from '../material/material.module'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	errorMessage: string;
	successMessage: string;
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  }) 

  constructor(private authService : AuthenticationService) { }

  ngOnInit() {
  }

  async register(data){
    await this.authService.register(data);
  }

  async login(data){
    await this.authService.login(data);
  }

  async logout(){
    await this.authService.logout();
  }

  async getCurrentUser(){
    console.log(await this.authService.getCurrentUser());
  }

}
