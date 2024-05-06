import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private _HttpClient:HttpClient) { }

  getTickets():Observable<any>{
    return this._HttpClient.get(environment.baseApi.replace('auth','admin') + 'tickets/getAll')
  }

  createTicket(model:any):Observable<any>{
    return this._HttpClient.post(environment.baseApi.replace('auth','admin')+'tickets/create',model)
  }
  updateTicket(model:any):Observable<any>{
    return this._HttpClient.post(environment.baseApi.replace('auth','admin')+'tickets/update',model)
  }
  deleteTicket(id:string):Observable<any>{
    return this._HttpClient.delete(environment.baseApi.replace('auth','admin') + `tickets/delete?id=${id}`)
  }



}
