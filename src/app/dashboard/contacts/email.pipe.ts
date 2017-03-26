import { Pipe, PipeTransform } from '@angular/core';
import { Email, emailStatus } from './contacts.model';

@Pipe({
  name: 'email'
})
export class EmailPipe implements PipeTransform {

  transform(emails: Email[], primary: boolean = false): any {
    if (!emails) {
      return '';
    }
    let email: Email;
    if (primary) {
      email = emails.find(e => e.primary);
    } else {
      email = emails.find(e => e.status === emailStatus.OK);
    }

    return email.email;
  };

}
