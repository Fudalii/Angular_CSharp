import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class GuardLoginService implements CanActivate {
  constructor(private router: Router, ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const loggedIn = localStorage.getItem('JwSToken');

    if (loggedIn) {
      console.log('Token no exist');
      return true;
    } else {
      console.log('Token OK !');

      this.router.navigate(['/login'], {
          queryParams: {
            return: state.url
          }
      });
      return false;
    }
  }
}
