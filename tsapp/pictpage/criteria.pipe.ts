/* tslint:disable use-pipe-transform-interface */
import { Pipe, PipeTransform } from '@angular/core';

import { CriteriaObject} from '../data-structure';


@Pipe({name: 'getOnlyActive'})

export class GetOnlyActive implements PipeTransform {
  transform(criterialist: CriteriaObject[]) {
    return criterialist.filter(criteria => criteria.deleted !== true);
  }
}
