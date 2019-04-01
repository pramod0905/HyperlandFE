import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from '../model/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getAllLocations():Observable<any>{
    var  baseURL = 'master/getAll/location'; 
    return this.http.get(baseURL);
  }

  createLocation(locationRequest : Location) : Observable<any>{
    var baseURL = 'master/add/location';
    return this.http.post(baseURL,locationRequest);
  }

  updateLocation(locationRequest: Location) : Observable<any> {
    var  baseURL = 'master/update/location/'+ locationRequest.id; 
    return this.http.post(baseURL,locationRequest);
  } 

  getLocationById(locationId : any) : Observable<any>{
    var  baseURL = 'master/get/location/'+locationId; 
    return this.http.get(baseURL);
  }

  deleteLocation(locationId) : Observable<any> {
    var  baseURL = 'master/delete/location/'+locationId; 
    return this.http.post(baseURL,{});
  }

  getAllLocationByCity(cityId : any) : Observable<any> {
    var  baseURL = 'selector/get/location/'+cityId; 
    return this.http.get(baseURL);
  } 
}
