import { Component } from '@angular/core';
import {DataProviderService} from '../../services/dataProvider.service'
import {Router} from '@angular/router';

@Component({
  selector: 'automation-dashboard',
  templateUrl: 'pages/automationDashboard/automationDashboard.html',
  styleUrls:['pages/automationDashboard/automationDashboard.scss']
})
export class AutomationDashboard  {
	automationType:Object[];

	constructor(private dataProviderService : DataProviderService, private router :Router){
	}

	//run on initialization of object
	ngOnInit(): void {
		this.automationType=this.dataProviderService.getAutomationTypes();
		console.log(this.automationType);
	}
	
	//will take you to the next level ;)
	goToNext(autoType:String){
		this.dataProviderService.initProject(autoType.toLowerCase()).subscribe(flag=>{
			if(flag){
	       		this.router.navigateByUrl('/automation/'+autoType);
	       	}else{
	       		console.log('request not resolved correctly..');
	       	}
	       },
	       err=>{
	       	console.log(err);
	       })
	}
}

