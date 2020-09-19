import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, delay, catchError, retry} from 'rxjs/operators';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Promotion } from '../../shared/promotion';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }
  getPromotions(): Observable<Promotion[]> {
    return this.http.get(baseURL + 'promotions')
                    .pipe(map(this.processHTTPMsgService.extractData),
                    catchError(this.processHTTPMsgService.handleError)
                    );
  }
  getPromotion(id: number): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions/' + id)
      .pipe(map(this.processHTTPMsgService.extractData),
        catchError(this.processHTTPMsgService.handleError)
      );
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions?featured=true')
                    .pipe(map(leaders => this.processHTTPMsgService.extractData(leaders[0])))
                    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
