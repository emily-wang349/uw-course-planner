import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent} from './Dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { TermComponent } from './Dashboard/term/term.component';
import { PlanComponent } from './Dashboard/plan/plan.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { MaterialModule } from './material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './_services/authentication.service';
import { ApiService } from './_services/api/api.service';
import { AngularFireAuth } from 'angularfire2/auth';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent, DashboardComponent, TermComponent, PlanComponent, UserInfoComponent, RegisterComponent
  ],
  imports: [
    BrowserModule, MaterialModule, RouterModule.forRoot(appRoutes), HttpClientModule, AngularFireModule.initializeApp(environment.firebase), ReactiveFormsModule
  ],
  providers: [AuthenticationService, AngularFireAuth, ApiService], 
  bootstrap: [AppComponent]
})

export class AppModule { }
