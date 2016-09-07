export class GoldenRow {
    filename: string;
    url: string;
    description: string;
    criteria_obj: {[key: string]: number};
    // This is SUPER strange, but the input "range" write a string in reality not a number. :/
    creation_date: string;
    passfail: boolean;
    explanation: string;
    type: string;
    info_url: string;
    info_url_arr: string[];
    oid: number;
    uuid: string;
}

export class ResultValue {
    username: string;
    filenameid: number;
    golden_passfail_state: boolean;
    success: boolean;
    fail_passed: boolean;
    positive_failed: boolean;
    answer: {[key: string]: number};
    inspection_date: string;
    user_comments: string;
    type: string;
    timeinsec: number;
    oid: number;
}

export class CriteriaObject {
  // This get loaded first
    uuid: string;
    name: string;
    deleted: boolean;
    target: number;
    selector: boolean;
    min_name: string;
    max_name: string;
}

export class PassFailResult {
    username: string;
    success: boolean;
    fail_passed: boolean;
    positive_failed: boolean;
    ct: number;
}

export class ResultFailRatio {
    username: string;
    success: boolean;
    golden_passfail_state: boolean;
    ct: number;
}

export class RatioPerUserStr {
    username: string;
    successgood: string; // this is a string since it come from the API as JSON but should eb a number
    successbad: string;
    failedgood: string;
    failedbad: string;
    total: string;
}

export class RatioPerUser {
    username: string;
    successgood: number;
    successbad: number;
    failedgood: number;
    failedbad: number;
    total: number;
}

export class RatioPerUserPc {
    // Percentage result for each user.
    username: string;
    globSuccessRate: number;
    succOnGoodImg: number;
    succOnBadImg: number;
    total: number;
}

export class UserDetails {
  email: string;
  username: string;
  name: string;
  role: string;
}

export class DbCriteria {
  crit_uuid: string;
  crit_value: string; // Should be a number but it come as a string from the API.
}

export class ReturnInfo {
  uuid: string;
  oid: number;
}

export class CriteriaToSend {
  'crit_uuid': string;
  'value': string | number;
}
