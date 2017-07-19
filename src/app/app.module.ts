import { NgModule }      from '@angular/core';
import {enableProdMode} from '@angular/core';  
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { routing } from './app.routes'

import { MDL } from '../directive/MaterialDesignLiteUpgradeElement';

import {DataProviderService} from '../services/dataProvider.service';
import {WebSocketService} from '../services/webSocket.service';

import { HomeComponent } from '../pages/home/home';
import { AutomationDashboard } from '../pages/automationDashboard/automationDashboard';
import { ProjectDashboard } from '../pages/projectDashboard/projectDashboard';
import { ProjectView } from '../pages/projectView/projectView';

@NgModule({
  	imports:[ 
  		BrowserModule,
      HttpModule,
      FormsModule,
  		routing 
  	],
  	declarations: [ 
  		AppComponent,
  		HomeComponent,
      AutomationDashboard,
      ProjectDashboard,
      ProjectView,
  		MDL
  	],
    providers: [ DataProviderService, WebSocketService],
    bootstrap:    [ AppComponent ]
})
export class AppModule {
  
 }
