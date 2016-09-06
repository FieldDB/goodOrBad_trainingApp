import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, NgIf, NgFor, NgClass } from '@angular/common';

import { GoldenRow, ResultValue, CriteriaObject, DbCriteria, CriteriaToSend} from '../data-structure';
import { GetOnlyActive } from './criteria.pipe';
import { DefaultDataService } from '../data.service';
import { CommService } from '../commService';

@Component({
    selector: 'pictpage',
    directives: [CORE_DIRECTIVES, NgIf, NgClass, NgFor],
    templateUrl: 'tsapp/pictpage/pictpage.html',
    styleUrls: ['tsapp/pictpage/pictpage.css', 'tsapp/common/slider-style.css'],
    pipes: [GetOnlyActive],
    providers: [CommService, DefaultDataService]
})

export class Pictpage implements OnInit {
    imgToInspect: GoldenRow;
    resultValue: ResultValue;
    criterialist: CriteriaObject[];
    error: any;
    submited: boolean;
    sliderStyle: boolean = false; // This is where we change the View to be a Slider Or a True/False buttons.
    blockSubmit: boolean;
    initialTimeStamp: number;
    oidOfResult: number;
    contestComments: string;
    contest: boolean = false;

    constructor(private commService: CommService, private defaultDataService: DefaultDataService) { }
    ngOnInit() {
        this.getDefaultCriteria();
        this.getOneImg();
    }

    getDefaultCriteria() {
        this.defaultDataService.arrOfCriteria().then(data => this.criterialist = data);
    }

    getOneImg() {
        // This start the Whole process again.
        this.blockSubmit = true;
        this.oidOfResult = 0;
        this.contestComments = '';
        this.contest = true; // We dont want to complaint before starting ;).
        this.resultValue = {
            'username': JSON.parse(localStorage.getItem('goodOrBadUser')).username,
            'filenameid': 0,
            'golden_passfail_state': null,
            'success': null,
            'fail_passed': null,
            'positive_failed': null,
            'answer': {},
            'inspection_date': '',
            'user_comments': '',
            'type': '',
            'timeinsec': 0,
            'oid': null
        };
        this.submited = false; // we get a new img.
        this.initialTimeStamp = Date.now();

        this.commService.getDbImg()
            .subscribe((arrayOf1: GoldenRow[]) => {
                // Get the Data from the server
                this.imgToInspect = arrayOf1[0];
                this.resultValue.filenameid = this.imgToInspect.oid;  // This should be a OID or something unique.
                this.resultValue.type = this.imgToInspect.type; // This could be fetch directly in the SQL by joining table, but I dont like joint of big table for 1 value only.
                this.resultValue.golden_passfail_state = this.imgToInspect.passfail; // So we can know the % of Good and Bad img were inspected.
                if (this.imgToInspect.info_url) {
                    this.imgToInspect.info_url_arr = JSON.parse(this.imgToInspect.info_url);
                }
                // Get the Defect associated with that uuid:
                this.commService.getUuidCriteria(this.imgToInspect.uuid)
                    .subscribe((arrayOfCrit: DbCriteria[]) => {
                        if (arrayOfCrit[0]) {
                          this.imgToInspect.criteria_obj = this.getKeyPairCrit(arrayOfCrit);
                        } else {
                          this.imgToInspect.criteria_obj = {};
                        }
                    },
                    error => {
                        console.log('ERROR:', error);
                        // Warn the user and display the Oid red?
                    });
            });
    }

    private getKeyPairCrit = (crit: DbCriteria[]) => {
        let tempObj: { [key: string]: string } = {};
        for (let i = 0; i < crit.length; i++) {
            tempObj[crit[i].crit_uuid] = crit[i].crit_value;
        }
        return tempObj;
    }

    private builtKeyValueArr = (crit: { [key: string]: string }, answer: { [key: string]: string }) => {
      let keyValuePair: CriteriaToSend[] = [];
      for (let someKey in crit) {
        if (crit[someKey] !== undefined && answer[someKey] !== undefined) {
          keyValuePair.push({'crit_uuid': someKey, 'value': parseInt(crit[someKey], 10) - parseInt(answer[someKey], 10)});
        }
      }
      return keyValuePair;
    }

    submitForm(result) {
        // Here submit the img and when we have feedback(promesses) we can call it submitted.
        this.resultValue.timeinsec = Math.round((Date.now() - this.initialTimeStamp) / 1000); // Time in Second it took.
        // this.resultValue.delta_criteria_array = JSON.stringify(this.resultValue.delta_array);
        if (result === this.imgToInspect.passfail) {
            // Both pass or both fail so It is all Good! The user took the good decision.
            this.resultValue.success = true;
        } else if (this.imgToInspect.passfail === true && result === false) {
            // Img was suppose to be good, but the user rejected it, then we have a Faillure and also a positive_failed
            this.resultValue.success = false;
            this.resultValue.positive_failed = true;
        } else if (this.imgToInspect.passfail === false && result === true) {
            // Img was suppose to be good, but the user rejected it, then we have a Faillure and also a positive_failed
            this.resultValue.success = false;
            this.resultValue.fail_passed = true;
        }
        let keyValueArr = [];
        if (this.imgToInspect.criteria_obj) {
          keyValueArr = this.builtKeyValueArr(this.imgToInspect.criteria_obj, this.resultValue.answer);
        }

        this.commService.postDbResult(this.resultValue)
            .subscribe(
            serverAnswer => {
                this.submited = true;
                this.oidOfResult = serverAnswer.oid;
                console.log('serverAnswer: ', serverAnswer);
                this.commService.updateAnswerCrit(serverAnswer.uuid, keyValueArr)
                  .subscribe(servAnswer => {
                    console.log('AFTER PUSH: ', servAnswer);
                  },
                  error => {
                      console.log('ERROR:', error);
                  });
            },
            error => {
                console.log('ERROR:', error);
            });
    }

    contestDecision() {
        // Here, Get the this.oidOfResult, add the explanation and submit the form.
        // Add info on the last Post and move on.
        window.alert('TODO: Make the node side and fix me after.');
        this.getOneImg();
    }

    sliderClass(delta: number) {
        if (!this.submited) {
            // Yes this should go in a service but it is soooo small it is a shame to put it away alone like a rejected function...
            if (delta === null || delta === undefined) { return 'default_null_value'; }
        } else {
            // TODO: on submit change the class Logic to set the class Green or Red depending if the user was succedful or Failed the criteria. (Check with tolerances)
            if (delta === null || delta === undefined) { return 'default_null_value'; }
            if (Math.abs(delta) <= 1) {
                return 'slider_passing_value';
            } else {
                return 'slider_failing_value';
            }
        }
    }

    btnClass(value: number, target: number, resultValue: number) {
        // Yes this should go in a service but it is soooo small it is a shame to put it away alone like a rejected function...
        if (value === null || value === undefined || resultValue === null || resultValue === undefined) {
            return 'btn-info';
        } else if (value === 1 && target === 1) {
            return 'btn-success';
        } else if (value === 0 && target === 0) {
            // This is conter intuitive, but it is because we have the Slider system also. that mean 1 is not always 'Good' and 0 is not always 'Bad'
            // it depend on what the user did input. and that will create a Delta value if the user failed.
            return 'btn-danger';
        }
    }

}
