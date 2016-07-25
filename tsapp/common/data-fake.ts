// Returning some fake data to who need it.
import { CriteriaObject, GoldenRow } from '../data-structure';

export const ArrOfCriteria: CriteriaObject[] = [
	{crit:"Criteria 1 to display", active: true},
	{crit:"Criteria 2 to display", active: true},
	{crit:"Criteria 3 to display", active: true},
	{crit:"Criteria 4 to display", active: true},
	{crit:"Criteria 5 to display", active: false},
	{crit:"Criteria 6 to display", active: true},
	{crit:"Long Criteria 7 to display the whole text for the user to see", active: true},
	{crit:"Another Longer Criteria 8 to display the whole text for the user to see so he can make a decision.", active: true},
	{crit:"Shorty", active: true},
	{crit:"Should not have any slider since no critera were set", active: true}
];

export const BlankGoldenImg: GoldenRow = {
	filename: "",
	url: "",
	description: "",
	criteria_array: "",
	criteria_array_converted: [],
	creation_date: "",
	passfail: null,
	explanation: "",
	type: "",
	info_url: "",
	oid: null
}