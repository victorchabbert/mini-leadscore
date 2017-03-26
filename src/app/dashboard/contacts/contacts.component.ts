import { Component, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { defaultOperator } from './filters.model';
import { Contact, gender, contactType, contactStatus } from './contacts.model';

@Component({
  selector: 'ls-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./spinners.component.css', './contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts = [];
  contactCount = 0;
  loading = true;
  // View helpers
  gender = gender;
  contactType = contactType;
  contactStatus = contactStatus;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.loading = true;
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
    }, offset, limit).subscribe(res => {
      this.addContacts(res.json());
      this.loading = false;
    });
  }

  onScrollDown() {
    this.loading = true;
    this.fetchContact(this.contactCount);
  }

  log(contact) {
    console.info('Click on contact:', contact);
  }
}
