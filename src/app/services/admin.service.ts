import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _httpClinet:HttpClient) { }

  getAllUsers():Observable<any>{
    return this._httpClinet.get(environment.baseApi.replace('auth','admin') + `getAllUsers` )
  }
  newAdmin(email:string):Observable<any>{
    let model={
      email,
      authorities:['Admin']
    }
    return this._httpClinet.post('http://localhost:8081/admin/authorities/add',model)
  }
}
