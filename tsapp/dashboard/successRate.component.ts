import { Component, OnInit } from '@angular/core';

import { PassFailResult } from '../data-structure';
import { CommService } from '../commService';

@Component({
	selector:'success-rate',
	templateUrl:'tsapp/dashboard/successRate.html'
})

export class SuccessRate implements OnInit {
	successRateFromServer: PassFailResult[];
	resultFailRatio: ResultFailRatio[];

	constructor(private commService: CommService) {}
	ngOnInit() {
		this.getServerPF();
		this.getServerRatio();
	}

	private getServerPF() {
		this.commService.passfailresult()
				.subscribe((arrayOfData:PassFailResult[]) => {
					if(arrayOfData[0]) {
						this.successRateFromServer = arrayOfData;
					}
				},
				error => {
  	               	console.log("ERROR:", error);
  	               	// Warn the user and display the Oid red?
  	            })
	}

	private getServerRatio() {
		this.commService.resFailRatio()
				.subscribe((arrayOfData:ResultFailRatio[]) => {
					if(arrayOfData[0]) {
						this.resultFailRatio = arrayOfData;
					}
				},
				error => {
  	               	console.log("ERROR:", error);
  	               	// Warn the user and display the Oid red?
  	            })
	}
}