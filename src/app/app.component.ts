import { Component } from '@angular/core';

import { HomeComponent } from '../pages/home/home';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
})
export class AppComponent  {
	homePage:HomeComponent;
	name = 'Angular'; 
	
}
