import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PLCService {

  constructor(private http: HttpClient) { }

  getAllPLC():Observable<any>{
    var  baseURL = 'master/getAll/plc'; 
    return this.http.get(baseURL);
  }

  createPLC(plcRequest : any) : Observable<any>{
    var baseURL = 'master/add/plc';
    return this.http.post(baseURL,plcRequest);
  }

  updatePLC(plcRequest: any) : Observable<any> {
    var  baseURL = 'master/update/plc/'+ plcRequest.id; 
    return this.http.post(baseURL,plcRequest);
  } 

  getPLCById(plcId : any) : Observable<any>{
    var  baseURL = 'master/get/plc/'+plcId; 
    return this.http.get(baseURL);
  }

  deletePLC(plcId) : Observable<any> {
    var  baseURL = 'master/delete/plc/'+plcId; 
    return this.http.post(baseURL,{});
  }
}
