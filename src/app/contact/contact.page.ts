import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  public contact: string;
  constructor(private activatedRoute: ActivatedRoute, private emailComposer: EmailComposer) { }

  ngOnInit() {
    this.contact = this.activatedRoute.snapshot.paramMap.get('id');
  }

  sendEmail() {
    const email = {
      to: 'confusion@food.net',
      subject: '[confusion] Query',
      body: 'Dear Sir/Madam:',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

}
