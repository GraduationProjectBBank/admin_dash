import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _HttpClient:HttpClient) { }
  createBlog(model:any):Observable<any>{
    let myContent=model.content
    delete model.content
    const finalModel={
      frontMatter:model,
      content:myContent
    }
    return this._HttpClient.post(environment.baseApi.replace('auth','admin') + `blog/create`,finalModel)
  }
}
