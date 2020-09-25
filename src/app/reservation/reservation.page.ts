import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  ios: boolean;
  android: boolean;
  windows: boolean;
  reservation: FormGroup;

  constructor(public modalCtrl: ModalController, public platform: Platform, public formBuilder: FormBuilder ) {
    this.ios = platform.is('ios');
    this.android = platform.is('android');
   }

  ngOnInit() {
    this.reservation = this.formBuilder.group({
      guests: 3,
      smoking: false,
      dateTime: ['', Validators.required],
    });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  onSubmit() {
    console.log(this.reservation.value);
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
