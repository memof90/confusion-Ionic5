import { Component, OnInit, Inject  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Leader } from '../../shared/leader';
import { LeaderService } from '../providers/leader.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  public about: string;
  leaders: Leader[];

  constructor(private activatedRoute: ActivatedRoute,
              private leaderService: LeaderService,
              @Inject('BaseURL') public BaseURL: any ) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe((leaders) =>  this.leaders  = leaders);
    this.about = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
