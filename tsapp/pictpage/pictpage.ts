import { Component, OnInit} from '@angular/core';
import { CORE_DIRECTIVES, NgIf, NgFor, NgClass} from '@angular/common';
import { Http, Response } from '@angular/http';

import { GoldenRow, ResultValue, CriteriaObject} from '../data-structure';
import { ArrOfCriteria } from '../data-fake';
import { CommService } from './commService';

@Component({
  selector: 'pictpage',
  directives: [ CORE_DIRECTIVES, NgIf, NgClass ],
  templateUrl: 'tsapp/pictpage/pictpage.html',
  styleUrls: [ 'tsapp/pictpage/pictpage.css' ]
})

export class Pictpage implements OnInit {
	imgToInspect: GoldenRow;
	resultValue: ResultValue;
	criterialist: CriteriaObject[];
	error: any;
	submited: boolean;
	sliderStyle: boolean = true;
	blockSubmit: boolean = true;
	initialTimeStamp: number;

	constructor(private commService: CommService){}
	ngOnInit() {
		this.criterialist = ArrOfCriteria;
		this.getOneImg();
	}

	getOneImg() {
		// This start the Whole process again.
		this.resultValue = {};
		this.resultValue.username = JSON.parse(localStorage.getItem("goodOrBadUser")).username;
		this.resultValue.delta_array = [];
		this.submited = false; //we get a new img.
		this.initialTimeStamp = Date.now();
		this.resultValue.user_comments = "";
    this.commService.getDbImg()
    			.subscribe((arrayOf1:GoldenRow[])=>{
    					// Get the Data from the server
    					this.imgToInspect = arrayOf1[0];
    					this.imgToInspect.criteria_array_converted = JSON.parse(arrayOf1[0].criteria_array);
    					// Also populate the Default Result to send back at the end.
    					this.resultValue.filenameid = this.imgToInspect.filename;  //This should be a OID or something unique.
    					this.resultValue.type = this.imgToInspect.type; //This could be fetch directly in the SQL by joining table, but I dont like joint of big table for 1 value only.
    			});
  }

  openImgInModal(url) {
  	window.alert("opening img " + url);
  }

  setCriteriaX(index, target, value) {
  	this.blockSubmit = false;
  	console.log("Selected value is: ",value);
  	if(!value) {
  		value = Math.round(Math.random()*10); // just for testing until I have my slider setup
  	}
  	this.resultValue.delta_array[index] = target - value;
  }

  submitForm(result) {
  	window.alert('Submitting the form (fakeing it, so fix me)');
  	
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

  	this.submited = true;
  }

  sliderClass(value) {
  	if(!this.submited) {
  		// Yes this should go in a service but it is soooo small it is a shame to put it away alone like a rejected function... 
  		if(value === null || value === undefined) {return {"default_null_value": true}; }
  	} else {
  	// TODO: on submit change the class Logic to set the class Green or Red depending if the user was succedful or Failed the criteria. (Check with tolerances)
  		if(value === null || value === undefined) {return {"default_null_value": true}; }
  		if(Math.abs(value) <= 1) {
  			return {"slider_passing_value": true};
  		} else {
  			return {"slider_failing_value": true};
  		}
  	}
  }

}
