import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ContactFilters } from './filters.model';

@Injectable()
export class ContactsService {

  constructor(private authHttp: AuthenticationService) { }

  getContacts(body: ContactFilters, offset?: number, limit?: number): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    if (offset) {
      params.set('offset', `${offset}`);
    }
    if (limit) {
      params.set('limit', `${limit}`);
    }

    return this.authHttp.post('contacts/filter', JSON.stringify(body), {
      search: params
    });
  }
}
