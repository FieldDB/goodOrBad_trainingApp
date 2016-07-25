import { Component, OnInit} from '@angular/core';
import { NgIf, NgFor, NgClass} from '@angular/common';

import { ArrOfCriteria, BlankGoldenImg } from '../data-fake';
import { GoldenRow, CriteriaObject } from '../data-structure';
import { CommService } from '../commService';

@Component({
	selector: 'golden',
	directives: [NgIf, NgFor, NgClass],
	styleUrls: ['tsapp/golden/golden.css', 'tsapp/common/slider-style.css'],
	templateUrl: 'tsapp/golden/golden.html',
	providers: [CommService]
})

export class Golden implements OnInit{
	goldenDetails: GoldenRow;
	criterialist: CriteriaObject[];

	constructor(private commService: CommService) {}
	
	ngOnInit() {
		this.criterialist = ArrOfCriteria;
		this.resetBlankImg();
	}

	resetBlankImg() {
		console.log("Blank Data Source:", BlankGoldenImg);
		// let tempData:GoldenRow = BlankGoldenImg;
		this.goldenDetails = BlankGoldenImg;
	}

	fetchOnEnter(event, oid) {
	  if(event.keyCode == 13 && oid) {
	    this.getPreciceImg(oid);
	  }
	}

	private getPreciceImg(imgOid:number) {
		this.commService.getPreciceGolden(imgOid)
				.subscribe((arrayOf1:GoldenRow[])=>{
					this.goldenDetails = arrayOf1[0];
				},
				error => {
  	               	console.log("ERROR:", error);
  	               	// Warn the user and display the Oid red?
  	            })
	}

	onSubmit() {
		console.log("Submitting the form");
		this.goldenDetails.criteria_array = JSON.stringify(this.goldenDetails.criteria_array_converted);

	}

	setRandomKittenUrl() {
		let nbr1:number = Math.floor(Math.random()*200) + 250; //Nbr between 250 and 450px
		let nbr2:number = Math.floor(Math.random()*200) + 250; //Nbr between 250 and 450px
		let grey:string = Math.random() > 0.5 ? 'g/' : '';
		this.goldenDetails.url = "https://placekitten.com/" + grey + nbr1 + "/" + nbr2;
	}
}
