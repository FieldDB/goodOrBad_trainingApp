import { RouterConfig } from '@angular/router';
import { Pictpage } from './pictpage/pictpage';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Home } from './home/home';
import { Golden } from './golden/golden';
import { AuthGuard } from './common/auth.guard';

// The Login/Security is handled by the Node module encapsulating this app. 
// The AuthGuard will serve as a backup to validate that the cookie was set, and to allow the manager to access different page in the app.
export const routes: RouterConfig = [
  { path: 'login',  component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'pictpage',   component: Pictpage, canActivate: [AuthGuard] },
  { path: 'home', component: Home },
  { path: 'golden', component: Golden },
  { path: '',       component:  Home },
  { path: '**',     component: Home }
];
