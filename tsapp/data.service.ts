import { Injectable } from '@angular/core';
import { ArrOfCriteria, BlankGoldenImg } from './common/data-fake';
import { CriteriaObject, GoldenRow } from './data-structure';

@Injectable()
export class DefaultDataService {
  arrOfCriteria() {
  	let data: CriteriaObject[] = Object.assign([], ArrOfCriteria); // cloned data object
    return Promise.resolve(data);
  }

  blankGoldenImg() {
  	let data = Object.assign({}, BlankGoldenImg); // cloned data object
  	return Promise.resolve(data);
  }
}
