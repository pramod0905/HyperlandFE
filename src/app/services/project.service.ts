import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../model/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllProjects():Observable<any>{
    var  baseURL = 'master/getAll/project'; 
    return this.http.get(baseURL);
  }

  createProject(projectRequest : Project) : Observable<any>{
    var baseURL = 'master/add/location';
    return this.http.post(baseURL,projectRequest);
  }

  updateProject(projectRequest: Project) : Observable<any> {
    var  baseURL = 'master/update/project/'+ projectRequest.id; 
    return this.http.post(baseURL,projectRequest);
  } 

  getProjectById(projectId : any) : Observable<any>{
    var  baseURL = 'master/get/project/'+projectId; 
    return this.http.get(baseURL);
  }

  deleteProjct(projectId) : Observable<any> {
    var  baseURL = 'master/delete/project/'+projectId; 
    return this.http.post(baseURL,{});
  }
}
