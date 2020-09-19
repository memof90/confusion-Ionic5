import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';



// service o provider
import { DishService } from './providers/dish.service';
import { LeaderService } from './providers/leader.service';
import { PromotionService } from './providers/promotion.service';
import { ProcessHttpmsgService } from './providers/process-httpmsg.service';
// pages
import { AboutPage } from './about/about.page';
import { HomePage } from './home/home.page';
import { ContactPage } from './contact/contact.page';
import { MenuPage } from './menu/menu.page';


// Provider
import { baseURL } from '../shared/baseurl';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DishService,
    LeaderService,
    PromotionService,
    ProcessHttpmsgService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: 'BaseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
