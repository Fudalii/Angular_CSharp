import { Injectable } from '@angular/core';
import { AlertifyService } from './alertify.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class UserService {
  baseURL = environment.apiUrl;

  headers = new HttpHeaders({ Authorization: 'Bearer ' + this.jWt() });

  constructor(
    private _httpClient: HttpClient,
    private alert: AlertifyService
  ) {}

  getUsers() {
    return this._httpClient.get<Array<User>>(this.baseURL + 'UserData/users', { headers: this.headers});
  }

  private jWt() {
    const token = localStorage.getItem('JwSToken');
    if (token) {
      return token;
    }
  }
}
