import { Pipe, PipeTransform } from '@angular/core';

import { GoldenRow} from '../data-structure';

@Pipe({name: 'filterOnRequest'})

export class FilterOnRequest implements PipeTransform {
  transform(criterialist: GoldenRow[], deleted: string, status: string, name: string) {
    return criterialist.filter(golden => {
      // I ahve to filter on the inverse so I return only when I pass all criteria and all criteria are optional.
      let allGood = true;
      if (name && golden.filename.toLowerCase().indexOf(name.toLowerCase()) === -1) {
        // If there is a criteria defined but it dosent match then Skip.
        allGood = false;
      };

      if (allGood || deleted === 'All') {
        if (deleted === 'Deleted' && golden.deleted !== true) {
          // If I want to see deleted ONLY and the img is NOT Deleted it mean I should skip it.
          allGood = false;
        } else if (deleted === 'Active' && golden.deleted === true) {
          // if I want to see Active image ONLY and they are Deleted then I skip ( Possibility = true, false, null)
          allGood = false;
        }
      }

      if (allGood || status === 'All') {
        if (status === 'Pass' && golden.passfail === false) {
          // I want only Passing image but that one fail.
          allGood = false;
        } else if (status === 'Fail' && golden.passfail !== false) {
          allGood = false;
        }
      }
      if (allGood) {
        return golden;
      }
    });
  };
}
