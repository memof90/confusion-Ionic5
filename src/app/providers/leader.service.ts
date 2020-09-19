import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, delay, catchError, retry} from 'rxjs/operators';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Leader } from '../../shared/leader';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) {}
  getLeaders(): Observable<Leader[]> {
    return this.http.get(baseURL + 'leaders')
                    .pipe(map(this.processHTTPMsgService.extractData),
                    catchError(this.processHTTPMsgService.handleError)
                    );
  }
  getLeader(id: number): Observable<Leader> {
    return this.http.get(baseURL + 'leaders/' + id)
      .pipe(map(this.processHTTPMsgService.extractData),
        catchError(this.processHTTPMsgService.handleError)
      );
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get(baseURL + 'leaders?featured=true')
                    .pipe(map(leaders => this.processHTTPMsgService.extractData(leaders[0])))
                    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
