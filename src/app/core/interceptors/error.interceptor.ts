import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/views/pages/auth/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private _Router:Router,
    private _AuthService:AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{

        // this._ToastrService.error(error.error.message,'Failed',
        //   {
        //     closeButton:true,
        //     easing:'ease-in-out',
        //     progressAnimation:'increasing',
        //     progressBar:true
        //   }
        // )
        // console.log(error.error);
        if(error.status === 401||error.status===403){
          this._AuthService.refreshToken().subscribe({
            next:(response)=>{
              localStorage.removeItem('token')
              localStorage.setItem('token',response.id_token)
            }
          })
        }
        throw error
      })
    );
  }
}
