import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { CommService } from './commService';

@Component({
  selector: 'my-app',
  templateUrl: 'tsapp/app.html',
  directives: [ ROUTER_DIRECTIVES, Navbar]
})

export class App {
  constructor(public router: Router) {}
}
