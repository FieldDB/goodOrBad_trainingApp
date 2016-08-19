// Returning some fake data to who need it.
import { CriteriaObject, GoldenRow } from '../data-structure';

export const ArrOfCriteria: CriteriaObject[] = [
    { uuid: 'Crit1', name: 'Does it contain Fur', deleted: false, target: null, selector: true, min_name: 'Skinny', max_name: 'Furry' },
    { uuid: 'Crit2', name: 'Cuteness Criteria', deleted: false, target: null, selector: true, min_name: 'Not', max_name: 'Adorable' },
    { uuid: 'Crit3', name: 'Realistic level', deleted: null, target: null, selector: true, min_name: 'No', max_name: 'Yes' },
    { uuid: 'Crit4', name: 'How blue is the Background', deleted: null, target: null, selector: true, min_name: '0', max_name: 'Yes' },
    { uuid: 'Crit6', name: 'How old is the Kitten Years', deleted: null, target: null, selector: true, min_name: 'Baby', max_name: 'Dead' },
    { uuid: 'Crit7', name: 'Is the Kitten Grey', deleted: null, target: null, selector: false, min_name: 'No', max_name: 'Grey!' },
    { uuid: 'Crit8', name: 'Would you adopt the kitten?', deleted: null, target: null, selector: false, min_name: 'Meh..', max_name: 'Hell Yea!' },
    { uuid: 'Crit9', name: 'Is there a Logo in the image?', deleted: null, target: null, selector: false, min_name: 'No', max_name: 'Yes' },
    { uuid: 'Crit10', name: 'Do you think the Kitten is planning something Evil?', deleted: null, target: null, selector: false, min_name: 'Not really', max_name: 'For sure!' }
];

export const BlankGoldenImg: GoldenRow = {
    filename: '',
    url: '',
    description: '',
    criteria_array: '',
    criteria_array_converted: [],
    creation_date: '',
    passfail: null,
    explanation: '',
    type: '',
    info_url: '',
    info_url_arr: [],
    oid: null
};
