import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ArrOfCriteria, BlankGoldenImg } from './common/data-fake';
import { CriteriaObject } from './data-structure';

@Injectable()
export class DefaultDataService {
    private baseUrl = 'http://localhost:8010/api/view/criteria';
    constructor(private http: Http) { }
    arrOfCriteria() {
      return this.http.get(this.baseUrl)
             .toPromise()
             .then(response => response.json() as CriteriaObject[])
             .catch(this.handleError);
    }

    private handleError(error: any) {
      // Normally we do this:
      // console.error('An error occurred', error);
      // return Promise.reject(error.message || error);
      // But I want to test locally for now so I will do this when the server do not exist:
      let data: CriteriaObject[] = Object.assign([], ArrOfCriteria); // cloned data object
      return Promise.resolve(data);
    }

    blankGoldenImg() {
        let data = Object.assign({}, BlankGoldenImg); // cloned data object
        return Promise.resolve(data);
    }
}
