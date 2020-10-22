import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register: FormGroup;
  image = 'assets/images/logo.png';

  constructor(public modalCtrl: ModalController,
              public formBuilder: FormBuilder,
              private camera: Camera,
             ) { }

  ngOnInit() {
    this.register = this.formBuilder.group({
      firstname: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      username: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      password: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]]

    });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  onSubmit() {
    console.log(this.register.value);
    this.dismiss();
  }
  getPicture() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT
    };

    this.camera.getPicture(options).then((imageData) => {
      this.image = imageData;
    }, (err) => {
      console.log('Error obtaining picture');
    });
  }
  getFromLibrary() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      correctOrientation: true,
      allowEdit: true,
      saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      cameraDirection: this.camera.Direction.FRONT
    }

    this.camera.getPicture(options)
      .then( (imagenData) => {
        this.image = 'data:image/png;base64,' + imagenData;
      },
      (err) => { console.log('Error obtaining picture'); });

  }


}
