import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent} from './Dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { TermComponent } from './term/term.component';
import { PlanComponent } from './plan/plan.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { MaterialModule } from './material/material.module';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent, DashboardComponent, TermComponent, PlanComponent, UserInfoComponent
  ],
  imports: [
    BrowserModule, MaterialModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
