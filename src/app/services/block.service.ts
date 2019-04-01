import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Block } from '../model/Block';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor(private http: HttpClient) { }
  
  getAllBlocks():Observable<any>{
    var  baseURL = 'master/getAll/block'; 
    return this.http.get(baseURL);
  }

  createBlock(blockRequest : Block) : Observable<any>{
    var baseURL = 'master/add/block';
    return this.http.post(baseURL,blockRequest);
  }

  updateBlock(blockRequest: Block) : Observable<any> {
    var  baseURL = 'master/update/block/'+ blockRequest.id; 
    return this.http.post(baseURL,blockRequest);
  } 

  getBlockById(blockId : any) : Observable<any>{
    var  baseURL = 'master/get/block/'+blockId; 
    return this.http.get(baseURL);
  }

  deleteBlock(blockId) : Observable<any> {
    var  baseURL = 'master/delete/block/'+blockId; 
    return this.http.post(baseURL,{});
  }
}
