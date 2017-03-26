import { Pipe, PipeTransform } from '@angular/core';
import { Phone, phoneStatus } from './contacts.model';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(phones: Phone[], primary: boolean = false): any {
    if (!phones) {
      return '';
    }
    let phone: Phone;
    if (primary) {
      phone = phones.find(e => e.primary);
    } else {
      phone = phones.find(e => e.status === phoneStatus.OK);
    }

    return phone.number;
  }

}
