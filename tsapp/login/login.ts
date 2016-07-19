import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

@Component({
  selector: 'login',
  directives: [ CORE_DIRECTIVES ],
  templateUrl: 'tsapp/login/login.html'
})
export class Login {
  createmanager() {
    window.alert("You are a manager");
  }

  createuser() {
    window.alert("You are a user");
  }
  
}
