import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BirdService} from './bird.service';
import {BirdComponent} from './bird.component';
import {HomeComponent} from './home.component';
import { AppComponent } from './app.component';
import { routing } from './app.router';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BirdComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'API Key'
    })
  ],
  providers: [BirdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
