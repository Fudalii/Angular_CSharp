import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthData } from '../_models/authData';
import { AlertifyService } from './alertify.service';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { environment } from '../../environments/environment';



@Injectable()
export class AuthService {
  baseURL = environment.apiUrl;

  userToken: any;
  decodeToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  redirectUrl = '';

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertifyService
  ) {}

  login(model: AuthData) {
    return this.httpClient.post(this.baseURL + 'auth/login', model).subscribe(x => {
      console.log(model);
      const user = JSON.parse(JSON.stringify(x));
      if (user.tokenString) {
        this.userToken = user.tokenString;
        localStorage.setItem('JwSToken', user.tokenString);
        this.decodeToken = this.jwtHelper.decodeToken(user.tokenString);
        console.log (this.decodeToken);
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
