import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';



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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Local Notifications
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

// email composer
import { EmailComposer } from '@ionic-native/email-composer/ngx';

// social sharing
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

// camera
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

// network connection
import { Network } from '@ionic-native/network/ngx';

// call number
import { CallNumber } from '@ionic-native/call-number/ngx';




// Provider
import { baseURL } from '../shared/baseurl';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    LocalNotifications,
    EmailComposer,
    SocialSharing,
    Camera,
    Network,
    CallNumber,
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
