import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, delay, catchError, retry} from 'rxjs/operators';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<any>;
  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { 
    this.favorites = [];
  }
  addFavorite(id: string): boolean {
    this.favorites.push(id);
    return true;
  }

  isFavorite(id: string): boolean {
    return this.favorites.some(el => el === id);
  }
}
