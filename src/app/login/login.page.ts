import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ios: boolean;
  android: boolean;

  loginForm: FormGroup;
  user: User = { username: '', password: ''};

  constructor(public modalCtrl: ModalController, public platform: Platform,
              private storage: Storage, public formBuilder: FormBuilder ) {
    this.ios = platform.is('ios');
    this.android = platform.is('android');
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
    this.storage.get('user').then(user => {
      if (user) {
        this.user = user;
        this.loginForm
          .patchValue({
            username: this.user.username,
            password: this.user.password
          });
      }
      else {
        console.log('user not defined');
      }
    });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  onSubmit() {
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;

    // tslint:disable-next-line: curly
    if (this.loginForm.get('remember').value)
      this.storage.set('user', this.user);
    // tslint:disable-next-line: curly
    else
      this.storage.remove('user');
    this.modalCtrl.dismiss({
        dismissed: true
      });
  }

}
