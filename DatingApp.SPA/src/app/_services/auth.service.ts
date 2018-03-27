import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthData } from '../_models/authData';
import { AlertifyService } from './alertify.service';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/User';



@Injectable()
export class AuthService {
  baseURL = environment.apiUrl;

  userToken: any;
  decodeToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  redirectUrl = '';
  curentUser: User;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertifyService
  ) {}

  login(model: AuthData) {
    return this.httpClient.post(this.baseURL + 'auth/login', model).subscribe(x => {

      const user = JSON.parse(JSON.stringify(x));
      console.log(user);
      console.log(user.tokenString);
     // console.log(user.userToRetturn);
      this.curentUser = user.userToRetturn;
      console.log('ok');
      console.log(JSON.stringify(this.curentUser));

      if (user.tokenString) {

        this.userToken = user.tokenString;

        localStorage.setItem('JwSToken', user.tokenString); // Token striong z API
        localStorage.setItem('userToRetturn', JSON.stringify(user.userToRetturn)); // user z API

        this.decodeToken = this.jwtHelper.decodeToken(user.tokenString);

        this.curentUser = this.jwtHelper.decodeToken(user.userToRetturn);



        this.route.queryParams.subscribe(
          params => (this.redirectUrl = params['return'])  );
        this.router.navigateByUrl(this.redirectUrl || '' );

        this.alert.success('Sukces');

      }
    }, (error: HttpErrorResponse) => {this.alert.error('Niepoprawne dane'); this.errorMessege(error); }
  );
  }

  register(model: AuthData) {
    return this.httpClient.post(this.baseURL + 'auth/register', model).subscribe(
      x => console.log(x),
      (error: HttpErrorResponse) => {this.errorMessege(error); console.log(error); }
    );
  }

  errorMessege(error: HttpErrorResponse) {
    console.log(JSON.stringify(error.error));

  }

  loggedIn() {
    return tokenNotExpired('JwSToken');
  }


}
