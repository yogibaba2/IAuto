import { Component } from '@angular/core';
import {DataProviderService} from '../../services/dataProvider.service'
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'project-view',
  templateUrl: 'pages/projectDashboard/projectDashboard.html',
  styleUrls:['pages/projectDashboard/projectDashboard.scss']
})
export class ProjectDashboard  {
	autoType:String;
	projects:Object;
	/*activated:number;*/
	constructor(private dataProviderService : DataProviderService, private route:ActivatedRoute, private router: Router){
	}

	ngOnInit(): void {
		this.autoType=this.route.snapshot.params['autoType'];
		console.log(this.autoType);
		this.dataProviderService.getProjects((obj:any)=>{
			this.projects=obj;
			console.log(this.projects);
		})
	}

	/*toggle_active(index:number){
	if (this.activated === index) {
      this.activated = 0;
    }
    else {
      this.activated = index;
    }
	}*/

	gotoNext(proName: string,index: number){
			var urlTree=this.router.createUrlTree(['/automation/'+this.autoType+'/'+proName+'-'+index]/*,{queryParams: {proIndex:index}}*/);
			this.router.navigateByUrl(urlTree);
	}
}