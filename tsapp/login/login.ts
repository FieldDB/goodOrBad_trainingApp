import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

@Component({
  selector: 'login',
  directives: [ CORE_DIRECTIVES ],
  templateUrl: 'tsapp/login/login.html'
})
export class Login {
	role: string;
	constructor() {
		this.role = JSON.parse(localStorage.getItem("goodOrBadUser")).role;
	}
  createmanager() {
    var user = {
      email: "thisWillWork@gmail.com",
      username: "awesomePerson",
      name: "aGoodUser",
      role: "manager"
    };
    localStorage.setItem('goodOrBadUser', JSON.stringify(user));
    var retreaving = JSON.parse(localStorage.getItem("goodOrBadUser"));
    console.log(retreaving);
    this.role = retreaving.role;
  }

  createuser() {
    var user = {
      email: "thisWillWork@gmail.com",
      username: "awesomePerson",
      name: "aGoodUser",
      role: "Simple mortal"
    };
    localStorage.setItem('goodOrBadUser', JSON.stringify(user));
    var retreaving = JSON.parse(localStorage.getItem("goodOrBadUser"));
    console.log(retreaving);
    this.role = retreaving.role;
  }
  
}
