import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
  	// Here change that to the logic you want, cookie stuff, permission, etc. 
    if (false) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
