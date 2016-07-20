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
}

export class ResultValue {
	username: string;
	filenameid: number;
	success: boolean;
	fail_passed: boolean;
	positive_failed: boolean;
	delta_criteria_array: string;
	delta_array: number[];
	inspection_date: string;
	user_comments: string;
	type: string;
	timeinsec: number;
}

exports.ArrOfCriteria = ["Criteria 1 to display",
	"Criteria 2 to display",
	"Criteria 3 to display",
	"Criteria 4 to display",
	"Criteria 5 to display",
	"Criteria 6 to display",
	"Long Criteria 7 to display the whole text for the user to see",
	"Another Longer Criteria 8 to display the whole text for the user to see so he can make a decision.",
	"Shorty",
	"Should not have any slider since no critera were set"]