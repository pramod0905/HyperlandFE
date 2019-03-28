import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Firm } from '../model/Firm';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class FirmService {

  constructor(public http: HttpClient) { }

  firmDataSource: any;
  
  getAllFirms():Observable<any>{
    var  baseURL = 'master/getAll/firm'; 
    return this.http.get(baseURL);
  }

  createFirm(firmRequest : Firm) : Observable<any>{
    var baseURL = 'master/add/firm';
    return this.http.post(baseURL,firmRequest);
  }

  updateFirm(firmRequest: Firm) : Observable<any> {
    var  baseURL = 'master/update/firm/'+ firmRequest.id; 
    return this.http.post(baseURL,firmRequest);
  } 

  getFirmById(firmId : any) : Observable<any>{
    var  baseURL = 'master/get/firm/'+firmId; 
    return this.http.get(baseURL);
  }

  deleteFirm(firmId) : Observable<any> {
    var  baseURL = 'master/delete/firm/'+firmId; 
    return this.http.post(baseURL,{});
  }
}
