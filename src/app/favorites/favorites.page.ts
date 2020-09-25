import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../../shared/dish';
import { FavoriteService } from '../providers/favorite.service';
import { baseURL } from '../../shared/baseurl';
import {  NavController, NavParams} from '@ionic/angular';
import { IonItemSliding , LoadingController, ToastController, AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';



@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;

  constructor(private favoriteservice: FavoriteService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              public toastCtrl: ToastController,
              @Inject('BaseURL') public BaseURL: any) { }

  ngOnInit() {
    this.favoriteservice.getFavorites()
    .subscribe(favorites => this.favorites = favorites,
      errmess => this.errMess = (errmess as any));
  }

   async deleteFavorite(item: IonItemSliding, id: string) {
     console.log('delete', id);
     const alert = this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Do you want to delete Dish' + ' ' + id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete',
           handler: async () => {
           const loading = this.loadingCtrl.create({
              message: 'Deleting...'
            });
           const toast = this.toastCtrl.create({
              message: 'Dish' + ' ' + id + ' ' + 'deleted suceessfully',
              duration: 3000,
              color: 'danger'
            });
           (await loading).present();
           this.favoriteservice.deleteFavorite(id)
          .subscribe( async favorites => {this.favorites = favorites; (await loading).dismiss();
                                          (await (toast)).present(); },
           async errmess => {this.errMess = errmess; (await loading).dismiss(); });
          }
        }
      ]
     });
     (await (alert)).present();
     item.close();
  }


}
