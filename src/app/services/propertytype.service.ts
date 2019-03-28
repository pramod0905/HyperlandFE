import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PropertyType } from '../model/PropertyType';

@Injectable({
  providedIn: 'root'
})
export class PropertytypeService {

  constructor(private http: HttpClient) { }
  
  getAllProperties():Observable<any>{
    var  baseURL = 'master/getAll/propertyType'; 
    return this.http.get(baseURL);
  }

  createPropertyType(propertTypeRequest : PropertyType) : Observable<any>{
    var baseURL = 'master/add/propertyType';
    return this.http.post(baseURL,propertTypeRequest);
  }

  updatePropertyType(propertTypeRequest : PropertyType) : Observable<any> {
    var  baseURL = 'master/update/propertyType/'+ propertTypeRequest.id; 
    return this.http.post(baseURL,propertTypeRequest);
  } 

  getPropertyTypeById(propertyTypeId : any) : Observable<any>{
    var  baseURL = 'master/get/propertyType/'+propertyTypeId; 
    return this.http.get(baseURL);
  }

  deletePropertyType(propertyTypeId) : Observable<any> {
    var  baseURL = 'master/delete/propertyType/'+propertyTypeId; 
    return this.http.post(baseURL,{});
  }
}
