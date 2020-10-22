import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  public contact: string;
  constructor(private activatedRoute: ActivatedRoute, private emailComposer: EmailComposer,
              private callNumber: CallNumber) { }

  ngOnInit() {
    this.contact = this.activatedRoute.snapshot.paramMap.get('id');
  }

  // tslint:disable-next-line: variable-name
  callnumber(number: string) {
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
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
