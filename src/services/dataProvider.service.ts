import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataProviderService {

	// Resolve HTTP using the constructor
     constructor (private http: Http) {}

     // private instance variable to hold base ip
	private api: String='192.168.0.109:3000'; // 10.150.0.102 office ip | 192.168.0.23 pg ip
  private headers = new Headers({ 'Content-Type': 'application/json' });

	private automationType:Object[]=[{
		"id": 0,
		"name": "Selenium",
		"logo":"img/selenium.png"

	}, {
		"id": 1,
		"name":"PostMan",
		"logo": "img/postman.png"
	}];

	private projectObject: any;
  	private projects: any;
    private reportObject: any;
    private projects_of_Report: any;

    //return webservices endpoint
    getAPI(): String{
    return this.api;
  	}

  	getAutomationTypes():Object[]{
    return this.automationType;
  	}

	initProject(autoType:String):Observable<any>{
	this.projects = null;


	return this.http.get('http://'+this.api+'/projects?projectType='+autoType)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => {
                         	console.log(res.json());
                         	this.projectObject=res.json();
                         	return this.projectObject.projectType;
                         })
                         //...errors if any
                         .catch((error:any) => {
                         	console.log(error.json().error || 'Server error');
                         	return null;
                         });
                       
	}
  	
  	getProjects(callback:any){
		this.projects = this.projectObject.projects;
		console.log(this.projects);
		callback(this.projects);
  	}

  	getProjectsById(projectId:number){
    	return this.projects[projectId];
  	}

  	getPackage(){
    	return this.projectObject.package;
  	}

   	getProjectType(){
    return this.projectObject.projectType;
  	}


  	initReport(autoType:String):Observable<any>{
    this.projects_of_Report = null;
    return this.http.get('http://'+this.api+'/reports/'+autoType)
    					// ...and calling .json() on the response to return data
                         .map((res:Response) => {
                         	console.log(res.json());
                         	this.reportObject=res.json();
                         	return this.reportObject.name;
                         })
                         //...errors if any
                         .catch((error:any) => {
                         	console.log(error.json().error || 'Server error');
                         	return null;
                         });
  }

  getProjectsReport(callback:any){
    /*if(projects_Report) {
      callback(projects_Report);
      return;
    };*/
    this.projects_of_Report = this.reportObject.projects;
    console.log(this.projects_of_Report);
    callback(this.projects_of_Report);
  }

   getProjectsReportById(projectId : any){
    return this.projects_of_Report[projectId];
  }

  getReportProjectType(){
    return this.reportObject.name;
  }


  //sevice to post data to prepare JSON or TestNg xml for execution

  prepareScript(prepareService: string, param: any):Observable<any>{
    return this.http.post('http://'+this.getAPI()+'/'+prepareService, param, {headers:this.headers}) // ...using post request
                         .map((res:Response) => {
                           console.log(res);
                           return "true";
                         }) // ...and calling .json() on the response to return data
                         .catch((error:any) => {
                           console.log(error || 'Server error');
                           return "null";
                         }); //...errors if any
  }


  //sevice to post data to prepare JSON for email reporting

  prepareEmail(param: any):Observable<any>{
    return this.http.post('http://'+this.getAPI()+'/prepareEmailJson', param, {headers:this.headers}) // ...using post request
                         .map((res:Response) => {
                           console.log(res);
                           return "true";
                         }) // ...and calling .json() on the response to return data
                         .catch((error:any) => {
                           console.log(error || 'Server error');
                           return "null";
                         }); //...errors if any
  }
 

}