import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: 'tsapp/app.html',
  directives: [ ROUTER_DIRECTIVES ]
})

export class App {
  constructor(public router: Router) {}
}
