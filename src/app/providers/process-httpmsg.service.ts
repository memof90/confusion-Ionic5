import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProcessHttpmsgService {



  constructor(private http: HttpClient) { }
  public extractData(res: Response): any {
    const body = res;
    return body || {};
  }

  public handleError(error: Response | any ): any {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json().then( body => {
        if (!body) {
          body = ' ';
        }
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      });
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(errMsg);
  }

  // public handleError(error: HttpErrorResponse | any) {
  //   let errMsg: string;
  
  //   if (error.error instanceof ErrorEvent) {
  //     errMsg = error.error.message;
  //   } else {
  //     errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
  //   }
  
  //   return throwError(errMsg);
  // }
}
