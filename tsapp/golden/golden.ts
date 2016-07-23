import { Component, OnInit} from '@angular/core';
import { NgIf, NgFor, NgClass} from '@angular/common';

import { ArrOfCriteria, BlankGoldenImg } from '../data-fake';
import { GoldenRow, CriteriaObject } from '../data-structure';

@Component({
	selector: 'golden',
	directives: [NgIf, NgFor, NgClass],
	styleUrls: ['tsapp/golden/golden.css', 'tsapp/common/slider-style.css'],
	templateUrl: 'tsapp/golden/golden.html'
})

export class Golden implements OnInit{
	goldenDetails: GoldenRow;
	criterialist: CriteriaObject[];

	constructor() {}

	ngOnInit() {
		this.criterialist = ArrOfCriteria;
		this.goldenDetails = BlankGoldenImg;
	}

	onSubmit() {
		console.log("Submitting the form");
		this.goldenDetails.criteria_array = JOSN.stringify(this.goldenDetails.criteria_array_converted);
	}

	setRandomKittenUrl() {
		let nbr1:number = Math.floor(Math.random()*200) + 250; //Nbr between 250 and 450px
		let nbr2:number = Math.floor(Math.random()*200) + 250; //Nbr between 250 and 450px
		let grey:string = Math.random() > 0.5 ? 'g/' : '';
		this.goldenDetails.url = "https://placekitten.com/" + grey + nbr1 + "/" + nbr2;
	}
}
