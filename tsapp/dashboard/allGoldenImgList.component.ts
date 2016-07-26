import { Component, OnInit } from '@angular/core';

import { GoldenRow } from '../data-structure';
import { CommService } from '../commService';

@Component({
	selector:'golden-img-list',
	templateUrl:'tsapp/dashboard/allGoldenImg.html',
	styleUrls: ['tsapp/dashboard/dashboard.css']
})

export class AllGoldenImgList implements OnInit {
	allGoldenImgFromServer: GoldenRow[];
	listStart: number = 0;
	listEnd: number = 10;
	tableLength: number;

	constructor(private commService: CommService) {}
	ngOnInit() {
		this.getAllImg();
	}

	private getAllImg() {
		this.commService.getAllGolden()
				.subscribe((arrayOfImg:GoldenRow[]) => {
					if(arrayOfImg[0]) {
						this.allGoldenImgFromServer = arrayOfImg;
						this.tableLength = arrayOfImg.length;
					}
				},
				error => {
  	               	console.log("ERROR:", error);
  	               	// Warn the user and display the Oid red?
  	            })
	}

	 scrollUpOrDownTheList (currentIndexLocation:number) {
		if(currentIndexLocation === 0 && this.listStart > 0){
			// I hover at index 0 so I want to go up. Work if we are not at 0 already.
			this.listEnd --;
			this.listStart --;
		} else if(currentIndexLocation === this.listEnd - this.listStart - 1 && this.listEnd <= this.tableLength) {
			// I hover at the last row position so I want to go down. if possible.
			this.listEnd ++;
			this.listStart ++;
		}
	 }
}