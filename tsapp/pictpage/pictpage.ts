import { Component, OnInit} from '@angular/core';
import { CORE_DIRECTIVES, NgIf, NgFor, NgClass} from '@angular/common';
import { Http, Response } from '@angular/http';

import { GoldenRow, ResultValue, CriteriaObject} from '../data-structure';
import { DefaultDataService } from '../data.service';
import { CommService } from '../commService';

@Component({
  selector: 'pictpage',
  directives: [ CORE_DIRECTIVES, NgIf, NgClass ],
  templateUrl: 'tsapp/pictpage/pictpage.html',
  styleUrls: [ 'tsapp/pictpage/pictpage.css', 'tsapp/common/slider-style.css' ],
  providers: [ CommService, DefaultDataService ]
})

export class Pictpage implements OnInit {
	imgToInspect: GoldenRow;
	resultValue: ResultValue;
	criterialist: CriteriaObject[];
	error: any;
	submited: boolean;
	sliderStyle: boolean = true; //This is where we change the View to be a Slider Or a True/False buttons.
	blockSubmit: boolean;
	initialTimeStamp: number;
	oidOfResult: number;
	contestComments: string;
	contest: boolean = false;

	constructor(private commService: CommService, private defaultDataService:DefaultDataService){}
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
		this.contestComments = "";
		this.contest = false; // We dont want to complaint before starting ;).
		this.resultValue = {
			"username": JSON.parse(localStorage.getItem("goodOrBadUser")).username,
			"filenameid": 0,
			"success": null,
			"fail_passed": null,
			"positive_failed": null,
			"delta_criteria_array": '',
			"delta_array": [],
			"inspection_date": '',
			"user_comments": '',
			"type": '',
			"timeinsec": 0,
			"oid": null
		};
		this.submited = false; //we get a new img.
		this.initialTimeStamp = Date.now();
		
    this.commService.getDbImg()
    			.subscribe((arrayOf1:GoldenRow[])=>{
    					// Get the Data from the server
    					this.imgToInspect = arrayOf1[0];
    					this.imgToInspect.criteria_array_converted = JSON.parse(arrayOf1[0].criteria_array);
    					if(!this.sliderStyle) {
    						// True false so I have to normalize them. Assomption here that the slider are 0-10. So Everything bellow 5 go to 0 and everything higher go to 1. 
    						this.imgToInspect.criteria_array_converted = this.imgToInspect.criteria_array_converted.map(item => {
    							if(item < 5) {
    								return 0;
    							} else {return 1;}
    						});
    					}
    					this.imgToInspect
    					// Also populate the Default Result to send back at the end.
    					this.resultValue.filenameid = this.imgToInspect.oid;  //This should be a OID or something unique.
    					this.resultValue.type = this.imgToInspect.type; //This could be fetch directly in the SQL by joining table, but I dont like joint of big table for 1 value only.
    			});
  }

  setCriteriaX(index, target, value) {
  	// Value or target can be 0
  	if(!this.submited && target !== undefined && value !== undefined) {
  		this.blockSubmit = false;
  		this.resultValue.delta_array[index] = target - value;
  	}
  }

  submitForm(result) {
  	// Here submit the img and when we have feedback(promesses) we can call it submitted.
  	this.resultValue.timeinsec = Math.round((Date.now() - this.initialTimeStamp)/1000); //Time in Second it took.
  	this.resultValue.delta_criteria_array = JSON.stringify(this.resultValue.delta_array);
  	if(result === this.imgToInspect.passfail) {
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

  	this.commService.postDbResult(this.resultValue)
  									.subscribe(
  	                     serverAnswer  => {
  												this.submited = true;
  	                     	this.oidOfResult = serverAnswer.oid;
  	                     },
  	                     error => {
  	                     	console.log("ERROR:", error);
  	                     });
  }

  contestDecision() {
  	// Here, Get the this.oidOfResult, add the explanation and submit the form.
  	// Add info on the last Post and move on.
  	window.alert('TODO: Make the node side and fix me after.');
  	this.getOneImg();
  }

  sliderClass(delta: number) {
  	if(!this.submited) {
  		// Yes this should go in a service but it is soooo small it is a shame to put it away alone like a rejected function... 
  		if(delta === null || delta === undefined) {return "default_null_value"; }
  	} else {
  	// TODO: on submit change the class Logic to set the class Green or Red depending if the user was succedful or Failed the criteria. (Check with tolerances)
  		if(delta === null || delta === undefined) {return "default_null_value"; }
  		if(Math.abs(delta) <= 1) {
  			return "slider_passing_value";
  		} else {
  			return "slider_failing_value";
  		}
  	}
  }

  btnClass(value:number, target:number, resultValue:number) {
  		// Yes this should go in a service but it is soooo small it is a shame to put it away alone like a rejected function... 
		if(value === null || value === undefined || resultValue === null || resultValue === undefined) {
			return "btn-info"; 
		} else if (value === 1 && target === 1) {
			return "btn-success";
		} else if (value === 0 && target === 0) {
			// This is conter intuitive, but it is because we have the Slider system also. that mean 1 is not always "Good" and 0 is not always "Bad" 
			// it depend on what the user did input. and that will create a Delta value if the user failed. 
			return "btn-danger";
		}
  }

}
