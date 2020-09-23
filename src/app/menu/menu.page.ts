import { Component, OnInit, Inject } from '@angular/core';
import {  NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from '../../shared/dish';
import { DishService } from '../providers/dish.service';
import { DishdetailPage } from '../dishdetail/dishdetail.page';
import { FavoriteService } from '../providers/favorite.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public menu: string;
  dishes: Dish[];
  errMess: string;
  selectedDish: Dish;
  constructor(private activatedRoute: ActivatedRoute, public navCtrl: NavController,
              private dishservice: DishService,
              private favoriteservice: FavoriteService,
              private router: Router,
              @Inject('BaseURL') public BaseURL: any
    ) { }

  ngOnInit() {
    this.dishservice.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = (errmess as any));
    this.menu = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  // navigate(){
  //   this.router.navigate(['/dishdetail/:id']);
  // }
  addToFavorite(dish: Dish) {
    console.log('Adding to Favorites', dish.id);
    this.favoriteservice.addFavorite(dish.id);
  }

}
