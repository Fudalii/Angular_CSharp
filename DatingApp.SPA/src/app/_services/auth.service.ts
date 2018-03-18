import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../nav/nav.component';
import { Response, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthService {
  baseURL = 'http://localhost:5000/api/auth/';

  userToken: string;
  redirectUrl = '';

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  login(model: LoginData) {
    return this.httpClient.post(this.baseURL + 'login', model).subscribe(x => {
              console.log(model);
              const user = JSON.parse(JSON.stringify(x));
              if (user.tokenString) {
                this.userToken = user.tokenString;
                localStorage.setItem('JwSToken', user.tokenString);
                localStorage.setItem('userName', model.username);
                console.log(this.route.queryParams.subscribe(params => this.redirectUrl = params['return']));
                this.router.navigateByUrl(this.redirectUrl || '/home');
              }
    });
  }
}
