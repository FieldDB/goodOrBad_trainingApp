export class GoldenRow {
	filename: string;
	url: string;
	description: string;
	criteria_array: string;
	criteria_array_converted: number[];
	creation_date: string;
	passfail: boolean;
	explanation: string;
	type: string;
	info_url:string;
	oid: number;
}

export class ResultValue {
	username: string;
	filenameid: number;
	golden_passfail_state: boolean;
	success: boolean;
	fail_passed: boolean;
	positive_failed: boolean;
	delta_criteria_array: string;
	delta_array: number[];
	inspection_date: string;
	user_comments: string;
	type: string;
	timeinsec: number;
	oid: number;
}

export class CriteriaObject {
    crit: string;
    active: boolean; // Impossible to predict everything, so eventually in the future we want to remove some criteria.
    // Option1: Having the DB have 1 cell per criteria --> If I want to add or remove it I have to change the DB and the code. Bad.
    // Option2 (currently selected): Having the criteria as an array in the cell -->
    // Fast to add new one and infite amount, Bad for sorting, Bad if we want to remove some on the way.
    // Since we have option2 we add flexibility by adding a Show/hide flag
    // Option3 would be to take option2 and instead of array of value/null we could strignify a object to have key-value pair,
    // but it is heavier on the DB.;
}

export class PassFailResult {
	username: string;
	success: boolean;
	fail_passed: boolean;
	positive_failed: boolean;
	ct: number;
}

export class ResultFailRatio {
	username:string,
	success:boolean,
	golden_passfail_state:boolean,
	ct:number
}

export class RatioPerUser {
    username: string;
    successGood: number;
    successBad: number;
    failedGood: number;
    failedBad: number;
}

export class ListOfUser {
    [n: string]: RatioPerUser;
}
