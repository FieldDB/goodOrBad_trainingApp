import { RouterConfig } from '@angular/router';
import { Pictpage } from './pictpage/pictpage';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { AuthGuard } from './common/auth.guard';

export const routes: RouterConfig = [
  { path: '',       component:  Login },
  { path: 'login',  component: Login },
  { path: 'signup', component: Signup },
  { path: 'pictpage',   component: Pictpage, canActivate: [AuthGuard] },
  { path: '**',     component: Login },
];
