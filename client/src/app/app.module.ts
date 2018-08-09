import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent} from './Dashboard/dashboard.component';
import { BannerComponent } from './Banner/banner.component'

@NgModule({
  declarations: [
    AppComponent, DashboardComponent, BannerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
