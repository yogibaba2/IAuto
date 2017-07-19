import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home'
import { AutomationDashboard } from '../pages/automationDashboard/automationDashboard'
import { ProjectDashboard } from '../pages/projectDashboard/projectDashboard'
import { ProjectView } from '../pages/projectView/projectView'

// Route Configuration
export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path:'automation/dashboard', component: AutomationDashboard},
  {path:'automation/:autoType', component: ProjectDashboard},
  {path:'automation/:autoType/:proName', component: ProjectView}

];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);