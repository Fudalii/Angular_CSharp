import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/User';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _alert: AlertifyService
  ) {}

  resolve( route: ActivatedRouteSnapshot): Observable<User>  {

    return this._userService.getUser(route.params['id']);

  }
}
