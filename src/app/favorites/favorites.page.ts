import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../../shared/dish';
import { FavoriteService } from '../providers/favorite.service';
import { baseURL } from '../../shared/baseurl';
import {  NavController, NavParams} from '@ionic/angular';
import { IonItemSliding , LoadingController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;

  constructor(private favoriteservice: FavoriteService,
              public loadingController: LoadingController,
              public toastCtrl: ToastController,
              @Inject('BaseURL') public BaseURL: any) { }

  ngOnInit() {
    this.favoriteservice.getFavorites()
    .subscribe(favorites => this.favorites = favorites,
      errmess => this.errMess = (errmess as any));
  }

   async deleteFavorite(item: IonItemSliding, id: string) {
    this.favoriteservice.deleteFavorite(id)
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
    const toast = this.toastCtrl.create({
      message: 'Dish' + ' ' + id + ' ' + 'deleted suceessfully',
      duration: 3000,
      color: 'danger'
    });
    (await toast).present();
    item.close();
  }


}
