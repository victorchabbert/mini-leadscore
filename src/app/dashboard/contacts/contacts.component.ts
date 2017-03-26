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
  contacts = [];
  gender = gender;
  contactType = contactType;
  contactCount = 0;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.fetchContact();
  }

  addContacts(payload: any) {
    const contacts = <Contact[]>payload.data;

    if (payload.offset >= this.contactCount) {
      this.contacts = this.contacts.concat(contacts);
      this.contactCount += contacts.length;
    }
  }

  fetchContact(offset?: number, limit?: number) {
    this.contactsService.getContacts({
      defaultOperator: defaultOperator.AND,
      filters: []
    }, offset, limit).subscribe(res => this.addContacts(res.json()));
  }

  onScrollDown() {
    this.fetchContact(this.contactCount);
  }

  log(contact) {
    console.info('Click on contact:', contact);
  }
}
