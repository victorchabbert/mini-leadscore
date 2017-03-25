import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ls-contacts',
  templateUrl: './contacts.component.html',
  styles: [`
    .ls-fmw {
      flex: 1 0 100px;
    }
    .ls-gender {
      width: 70px;
      padding-right: 15px;
      text-align: center;
    }
  `]
})
export class ContactsComponent implements OnInit {
  contacts = [];
  constructor() { }

  ngOnInit() {
    this.fetch(data => this.contacts = data);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/MOCK_DATA.json');
    req.onload = () => cb(JSON.parse(req.response));
    req.send();
  }

}
