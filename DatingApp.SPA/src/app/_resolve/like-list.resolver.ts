import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/User';
import { Observable } from 'rxjs/Observable';
import { PaginatedResult } from '../_models/pagination';



@Injectable()
export class LikeListResolver implements Resolve<PaginatedResult<User[]>> {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _alert: AlertifyService
  ) {}

  pageSize = 10;
  pageNumber = 1;
  likeParams = 'Likers';


  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<User[]>> {
    return this._userService.getUsers(this.pageNumber, this.pageSize, null, this.likeParams);
  }
}
