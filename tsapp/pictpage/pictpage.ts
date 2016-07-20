import { Component } from '@angular/core';
import { CORE_DIRECTIVES, NgIf, NgFor} from '@angular/common';
import { Http, Response } from '@angular/http';

import { GoldenRow, ResultValue, ArrOfCriteria } from 'tsapp/data-structure';
import { CommService } from 'tsapp/pictpage/commService';

@Component({
  selector: 'pictpage',
  directives: [ CORE_DIRECTIVES, NgIf ],
  templateUrl: 'tsapp/pictpage/pictpage.html',
  styleUrls: [ 'tsapp/pictpage/pictpage.css' ]
})

export class Pictpage implements OnInit {
	imgToInspect: GoldenRow;
	resultValue: ResultValue = {};
	criterialist: string[];
	error: any;
	submited: boolean;
	blockSubmit: boolean = true;
	initialTimeStamp: number;

	constructor(private commService: CommService){}
	ngOnInit() {
		this.resultValue.username = JSON.parse(localStorage.getItem("goodOrBadUser")).username;
		this.resultValue.delta_array = [];
		this.getOneImg();
		this.criterialist = ArrOfCriteria;
	}

	getOneImg() {
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

}
