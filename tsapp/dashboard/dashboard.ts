import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

// Saller Analytics module
import { AllGoldenImgList } from './allGoldenImgList.component'
import { SuccessRate } from './successRate.component'


@Component({
	selector:'dashboard',
	templateUrl:'tsapp/dashboard/dashboard.html',
	directives: [ NgIf, NgFor, AllGoldenImgList, SuccessRate ],
	styleUrls: ['tsapp/dashboard/dashboard.css']
})

// Q: Since we will load analytics from the server, we could in theory make all the call at once and let the promesses come in the order they feel like.
// Option1: Make all request at ngInit --> Heavy load on server/SQL, User might not look at all the data, slower on Page load. Good: It will be fast if he does.
// Option2: Load data as we go. Fast to open the first page, but a tini slower to open each other page after.
// I will go with Option2 for now.
export class Dashboard{
	isManager: boolean;
	section: string = "";

	constructor() {
		this.isManager = JSON.parse(localStorage.getItem("goodOrBadUser")).role === 'manager';
	}
}
