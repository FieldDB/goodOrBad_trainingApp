// Returning some fake data to who need it.
import { CriteriaObject, GoldenRow } from '../data-structure';

export const ArrOfCriteria: CriteriaObject[] = [
    { crit: 'Does it contain Fur', active: true },
    { crit: 'Cuteness Criteria', active: true },
    { crit: 'Realistic level', active: true },
    { crit: 'How blue is the Background', active: true },
    { crit: 'Old criteria that we dont use anymore, (not active)', active: false },
    { crit: 'How old is the Kitten Years', active: true },
    { crit: 'Is the Kitten Grey?', active: true },
    { crit: 'Would you adopt the kitten?', active: true },
    { crit: 'Is there a Logo in the image?', active: true },
    { crit: 'Do you think the Kitten is planning something Evil?', active: true }
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
