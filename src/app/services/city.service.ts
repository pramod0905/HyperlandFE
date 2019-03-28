import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { City } from '../model/City';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }
  
  getAllCities():Observable<any>{
    var  baseURL = 'master/getAll/city'; 
    return this.http.get(baseURL);
  }

  createCity(cityRequest : City) : Observable<any>{
    var baseURL = 'master/add/city';
    return this.http.post(baseURL,cityRequest);
  }

  updateCity(cityRequest: City) : Observable<any> {
    var  baseURL = 'master/update/city/'+ cityRequest.id; 
    return this.http.post(baseURL,cityRequest);
  } 

  getCityById(cityId : any) : Observable<any>{
    var  baseURL = 'master/get/city/'+cityId; 
    return this.http.get(baseURL);
  }

  deleteCity(cityId) : Observable<any> {
    var  baseURL = 'master/delete/city/'+cityId; 
    return this.http.post(baseURL,{});
  }

}
