import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {  NavController, NavParams, IonInfiniteScroll } from '@ionic/angular';
import { Location } from '@angular/common';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { DishService } from '../providers/dish.service';
import { switchMap } from 'rxjs/operators';
import { FavoriteService } from '../providers/favorite.service';
import { LoadingController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public dishdetail: string;
  dish: Dish;
  dishIds: string[];
  errMess: string;
  avgstars: string;
  numcomments: number;
  dishErrMess: string;
  favorite = false;

  constructor(private activatedRoute: ActivatedRoute,
              private dishService: DishService,
              private toastCtrl: ToastController,
              @Inject('BaseURL') public BaseURL: any,
              private favoriteservice: FavoriteService
    ) {}


  ngOnInit(){
    //  this.dishdetail = this.activatedRoute.snapshot.paramMap.get('id');
    this.dishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    this.activatedRoute.params.pipe(switchMap((params: Params) => this.dishService.getDish(params.id)))
    .subscribe(dish => {this.dish = dish;
                        this.favorite = this.favoriteservice.isFavorite(this.dish.id);
                        this.numcomments = this.dish.comments.length;
                        let total = 0;
                        this.dish.comments.forEach(comment => total += comment.rating );
                        this.avgstars = (total / this.numcomments).toFixed(2);
                        } ,
      errmess => this.errMess = (errmess as any));
    }

    async addToFavorites() {
      console.log('Adding to Favorites');
      this.favorite = this.favoriteservice.addFavorite(this.dish.id);
      const toast = this.toastCtrl.create({
        message: 'Dish'  +  ' ' + this.dish.id  + ' '  +  'added as favorite successfully',
        duration: 3000,
        color: 'success'
      });
      (await toast).present();
    }
}
