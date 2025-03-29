import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let modifiedReq = req;
    console.log("my auth interceptor");

    if(token){
      modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`

      }
    }); 
    console.log("Interceptor is working");

  }
  return next.handle(modifiedReq).pipe(
    catchError((error: HttpErrorResponse)=>{
      if(error.status === 401){
        console.error("unauthorized request redirect to login");
      }
      return throwError(error);
    })
  );
}
   

}

