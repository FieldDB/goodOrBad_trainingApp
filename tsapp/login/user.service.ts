// This will get the user details from the Node server/Passport directly.
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserDetails } from '../data-structure';

@Injectable()
export class UserService {
  baseUrl: string = 'http://localhost:8010/';
  constructor(private http: Http) {
  }
  // Result page
  getUserDetails(): Observable<UserDetails> {
      let randgoldenUrl = this.baseUrl + 'api/whoislogin/';  // URL to web api
      return this.http.get(randgoldenUrl)
          .map(this.extractData)
          .catch(this.handleError);
  }

  private extractData(res: Response) {
      let body = res.json();
      return body || {};
  }

  private handleError(error: any) {
      // In a real world app, we might use a remote logging infrastructure
      // We'd also dig deeper into the error to get a better message
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }
}
