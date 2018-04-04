import { Injectable } from '@angular/core';
import { AlertifyService } from './alertify.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Headers, RequestOptions, HttpModule } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthHttp } from 'angular2-jwt';
import { PaginatedResult } from '../_models/pagination';


@Injectable()
export class UserService {
  baseURL = environment.apiUrl;

  constructor(
    private _httpClient: HttpClient,
    private alert: AlertifyService
  ) {}


  getUsers(page?, itemsPerPage?, userParams?: any) {

   const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
   let params = new HttpParams();

   if (page != null && itemsPerPage != null) {
     params = params.append('pageNumber', page);
     params = params.append('pageSize', itemsPerPage);
   }

   if (userParams != null) {
     params = params.append('minAge', userParams.minAge);
     params = params.append('maxAge', userParams.maxAge);
     params = params.append('gender', userParams.gender);
     params = params.append('orderby', userParams.orderby);
   }

      return this._httpClient.get<User[]>( this.baseURL + 'UserData/users', { observe: 'response', params })
      .map( response => {
           paginatedResult.result = response.body;
           paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            console.log('UserService');
            console.log(paginatedResult.pagination);
           return paginatedResult;

      });

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

  deletePhoto(userid: User, id: number) {
    return this._httpClient.delete(this.baseURL + 'users/' + userid + '/photos/' + id + '/delete');
  }

  sendLike(id: number, recupientId: number) {
    return this._httpClient.post(this.baseURL + 'UserData/' + id + '/like/' + recupientId, {});
  }

}
