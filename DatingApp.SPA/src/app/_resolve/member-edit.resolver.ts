import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/User';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_services/auth.service';
import { JwtHelper } from 'angular2-jwt';



@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _auth: AuthService,
  ) {}

  resolve( route: ActivatedRouteSnapshot): Observable<User>  {
    // const token = this._jwt.decodeToken(user.tokenString);
    return this._userService.getUser(this._auth.decodeToken.nameid);
  }
}
