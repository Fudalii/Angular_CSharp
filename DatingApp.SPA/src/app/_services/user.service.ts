import { Injectable } from '@angular/core';
import { AlertifyService } from './alertify.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class UserService {
  baseURL = environment.apiUrl;

  constructor(
    private _httpClient: HttpClient,
    private alert: AlertifyService
  ) {}

  getUsers() {
    return this._httpClient.get<Array<User>>(this.baseURL + 'UserData/users');
  }

  getUser(id: string) {
    return this._httpClient.get<User>(this.baseURL + 'UserData/' + id);
  }

  updateUser(id: number , body: User) {
    return this._httpClient.put<User>(this.baseURL + 'UserData/' + id, body );
  }

  setMainPhoto(userid: User, id: number) {
    return this._httpClient.post(this.baseURL + 'users/' + userid + '/photos/' + id + '/isMain', '');
  }

}
