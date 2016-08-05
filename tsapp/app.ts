import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { UserService } from './login/user.service';

// Pre-compiling routes asked by Angular
import { Home } from './home/home';
import { Pictpage } from './pictpage/pictpage';
import { Dashboard } from './dashboard/dashboard';
import { UserDetails } from './data-structure';
import { Golden } from './golden/golden';

@Component({
  selector: 'my-app',
  templateUrl: 'tsapp/app.html',
  directives: [ ROUTER_DIRECTIVES, Navbar],
  providers: [ UserService ],
  precompile: [ Home, Dashboard, Pictpage, Golden ]
})

export class App implements OnInit {
  constructor(public router: Router, private userService: UserService) {}

  ngOnInit() {
    this.getPreciceImg();
  }
  private getPreciceImg() {
      this.userService.getUserDetails()
          .subscribe((userInfo: UserDetails) => {
              if (userInfo) {
                console.log('Array Of 1 is:', userInfo);
                  localStorage.setItem('goodOrBadUser', JSON.stringify(userInfo));
              }
          },
          error => {
              console.log('ERROR in user Data:', error);
              // There is an error, probably because we test locally and not with the server on, so just set the test user for now
              let user = {
                  email: 'thisWillWork@gmail.com',
                  username: 'awesomePerson',
                  name: 'aGoodUser',
                  role: 'manager'
              };
              // TODO: Later when we test on a real server handle that correcly.
              localStorage.setItem('goodOrBadUser', JSON.stringify(user));
          });
  }
}
