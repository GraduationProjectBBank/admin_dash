import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  constructor(private _HttpClient:HttpClient) { }

  createEmergency(model:any):Observable<any>{
    let emerg:object = {
      frontMatter:model
    }
    return this._HttpClient.post(environment.baseApi.replace('auth','admin')+`emergency/create`,emerg)
  }
  getEmergency():Observable<any>{
    return this._HttpClient.get(environment.baseApi.replace('auth/','')+`emergency/getAll`)
  }
  updateEmergency(model:any):Observable<any>{
    let emerg:object = {
      id:model.id,
      frontMatter:model
    }
    return this._HttpClient.post(environment.baseApi.replace('auth','admin')+`emergency/update`,emerg)
  }
}
