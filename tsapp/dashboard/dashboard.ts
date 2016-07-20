import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
	selector:'dashboard',
	templateUrl:'tsapp/dashboard/dashboard.html',
	directives: [ NgIf ]
})

export class Dashboard{
	isManager: boolean;

	constructor() {
		this.isManager = JSON.parse(localStorage.getItem("goodOrBadUser")).role === 'manager';
	}
}
