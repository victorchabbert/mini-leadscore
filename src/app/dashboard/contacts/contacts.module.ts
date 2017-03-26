import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsService } from './contacts.service';
import { PhonePipe } from './phone.pipe';
import { EmailPipe } from './email.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ContactsService
  ],
  declarations: [ContactsComponent, PhonePipe, EmailPipe]
})
export class ContactsModule { }
