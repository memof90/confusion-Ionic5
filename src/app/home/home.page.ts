import { Component, OnInit , Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../../shared/dish';
import { DishService } from '../providers/dish.service';
import { Promotion } from '../../shared/promotion';
import { PromotionService } from '../providers/promotion.service';
import { Leader } from '../../shared/leader';
import { LeaderService } from '../providers/leader.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public home: string;
  dish: Dish;
  leader: Leader;
  promotion: Promotion;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor(private activatedRoute: ActivatedRoute,
              public navCtrl: NavController,
              private dishservice: DishService,
              private promotionservice: PromotionService,
              private leaderservice: LeaderService,
              @Inject('BaseURL') public BaseURL: any) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe( dish => this.dish = dish,
    errmess => this.dishErrMess = (errmess as any));
    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion,
    errmess => this.promoErrMess = (errmess as any)) ;
    this.leaderservice.getFeaturedLeader()
    .subscribe((leader) => this.leader = leader,
    errmess => this.leaderErrMess = (errmess as any));
    this.home = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
