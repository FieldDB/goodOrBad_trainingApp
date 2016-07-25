import { Injectable } from '@angular/core';
import { ArrOfCriteria, BlankGoldenImg } from './common/data-fake';
import { CriteriaObject, GoldenRow } from './data-structure';

@Injectable()
export class DefaultDataService {
  arrOfCriteria() {
    return Promise.resolve(ArrOfCriteria);
  }

  blankGoldenImg() {
  	return Promise.resolve(BlankGoldenImg);
  }
}
