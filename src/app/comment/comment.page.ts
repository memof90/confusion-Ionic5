import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, ToastController, ActionSheetController, ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../../shared/comment';
import { Dish } from '../../shared/dish';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  constructor(public modalCtrl: ModalController, public formBuilder: FormBuilder,
              private navParams: NavParams
    ) { }
  commentForm: FormGroup;

  @Input() comment: Comment;


  dish: Dish;

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      comment: ['', [Validators.required]],

    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }


   onSubmit() {
    console.log(this.commentForm.value);
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.modalCtrl.dismiss(this.comment);
  }

}
