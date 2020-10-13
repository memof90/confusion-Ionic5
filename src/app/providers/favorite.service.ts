import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, delay, catchError, retry} from 'rxjs/operators';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Dish } from '../../shared/dish';
import { DishService } from './dish.service';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';




@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<any>;
  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService,
              private dishservice: DishService, private storage: Storage, private localNotifications: LocalNotifications
    ) {
      storage.get('favorites').then(favorites => {
        if (favorites) {
          this.favorites = favorites;
        }else {
          this.favorites = [];
        }
      });
  }
  addFavorite(id: string): boolean {
    // tslint:disable-next-line: curly
    if (!this.isFavorite(id)) {
      this.favorites.push(id);
      this.storage.set('favorites', this.favorites);
      this.localNotifications.schedule({
        id: parseInt(id, 2),
        text: 'Dish' + id + 'added as a favorite successfully',

      });
    }
    console.log('favorites', this.favorites);
    return true;
}

  isFavorite(id: string): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
      .pipe(map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id))));
  }

  deleteFavorite(id: string): Observable<Dish[]>  {
    const index = this.favorites.indexOf(id);
    if (index >= 0 ) {
      this.favorites.splice(index, 1);
      this.storage.set('favorites', this.favorites);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return throwError('Deleting non-existing favorite' + id);
    }
  }
}
