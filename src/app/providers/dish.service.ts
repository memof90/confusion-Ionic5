import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, delay, catchError, retry} from 'rxjs/operators';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
                    .pipe(map(this.processHTTPMsgService.extractData),
                    catchError(this.processHTTPMsgService.handleError)
                    );
  }
  getDish(id: number): Observable<Dish> {
    return this.http.get(baseURL + 'dishes/' + id)
      .pipe(map(this.processHTTPMsgService.extractData),
        catchError(this.processHTTPMsgService.handleError)
      );
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
                    .pipe(map(dishes => this.processHTTPMsgService.extractData(dishes[0])))
                    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
