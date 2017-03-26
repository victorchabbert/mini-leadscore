import { Component, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { defaultOperator } from './filters.model';
import { Contact, gender, contactType } from './contacts.model';

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
    .ls-type {
      width: 50px;
      text-align: center;
    }
  `]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  gender = gender;
  contactType = contactType;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getContacts({
      defaultOperator: defaultOperator.AND,
      filters: []
    }).subscribe(res => this.contacts = <Contact[]>res.json().data);
  }

  log(contact) {
    console.info('Click on contact:', contact);
  }
}
