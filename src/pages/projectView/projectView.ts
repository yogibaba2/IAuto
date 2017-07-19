import { Component } from '@angular/core';

import {DataProviderService} from '../../services/dataProvider.service'
import {WebSocketService} from '../../services/webSocket.service';

import {Router, ActivatedRoute, Params} from '@angular/router';



@Component({
  selector: 'project-view',
  templateUrl: 'pages/projectView/projectView.html',
  styleUrls:['pages/projectView/projectView.scss']
})

export class ProjectView  {

	/*private wSocket: Subject<Message>  = new Subject<Message>();*/

	activated:boolean= false;
	autoType:string;
	proIndex:number;
	package:string;
	project:any;
	proType:string;
	param:any;
	prepareService:string;


	constructor(private dataProviderService : DataProviderService, private wbService: WebSocketService, private route:ActivatedRoute, private router: Router){
	}
	

	ngOnInit(): void {
		this.autoType=this.route.snapshot.params['autoType'];
		var pro=this.route.snapshot.params['proName'].split("-");
		this.proIndex=parseInt(pro[pro.length-1]);

		this.package=this.dataProviderService.getPackage();
		this.proType=this.dataProviderService.getProjectType();

		this.project=this.dataProviderService.getProjectsById(this.proIndex);
	}

	prepareScripts(formValues: any,):void{

		console.log(formValues);

		if(true){
			let emailParam = JSON.stringify(formValues);
			this.dataProviderService.prepareEmail(emailParam).subscribe(flag=>{
			if(flag){
	       		console.log('request successfull..');
	       	}else{
	       		console.log('request not resolved correctly..');
	       	}
	       },
	       err=>{
	       	console.log(err);
	       });
		}
		


		this.param={
		'package' :this.package,
		'project' : this.project.name,
	 	'scripts' : []
		};
		
		this.project.scripts.forEach((script:any)=>{
			if(script.checked){
				this.param.scripts.push(script.name);
			}
		});


		if(this.proType=='selenium'){
			this.prepareService='createTestNg';
		}

		if(this.proType=='postman'){
			this.prepareService='preparePostmanJson';
		}
		console.log(this.param);

		if(this.param.scripts.length>=1){
			let bodyString = JSON.stringify(this.param); // Stringify payload
        // Create a request option

        this.dataProviderService.prepareScript(this.prepareService,bodyString).subscribe(flag=>{
			if(flag){
	       		console.log('request successfull..');
	       		this.execute();
	       	}else{
	       		console.log('request not resolved correctly..');
	       	}
	       },
	       err=>{
	       	console.log(err);
	       })
		}else{
			alert("please select atleast one Script to execute..");
		}
		
;
    


	}

	execute():void{
		let proType=this.proType
		let ws = new WebSocket('ws://'+this.dataProviderService.getAPI()+'/execute');
		console.log('trying to connect.....');
      	ws.onopen = function(){  
	        console.log('connected');
	       
      	};
      	ws.onmessage = function(event){
	        console.log(event.data);	
	        if(event.data.toString()=='connection accepted'){
	        	 document.getElementById('log-viewer').innerHTML='';
	       		 ws.send(proType);
	        }
	        else{
				var node = document.createElement("p");
				var textnode = document.createTextNode(event.data.toString());
				node.appendChild(textnode);
				document.getElementById("log-viewer").appendChild(node);
	        }
	        
	       //$scope.executionLog+=(event.data).toString()+"\n";
      	};
	}

}