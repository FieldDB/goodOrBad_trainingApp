import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { GoldenRow }      from '../data-structure';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable()
export class CommService {
  constructor (private http: Http) {}
  private randgoldenUrl = 'http://localhost:8010/api/view/randgolden';  // URL to web api
  
  getDbImg() : Observable<GoldenRow[]> {
    return this.http.get(this.randgoldenUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}