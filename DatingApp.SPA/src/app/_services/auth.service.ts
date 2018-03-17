import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../nav/nav.component';
import { Response, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  baseURL = 'http://localhost:5000/api/auth/';

  userToken: string;

  constructor(private httpClient: HttpClient) {}

  login(model: LoginData) {

    return this.httpClient
          .post(this.baseURL + 'login', model).subscribe(
                  x =>  {
                          console.log(model);
                          const user = JSON.parse(JSON.stringify(x));
                          if (user.tokenString) {
                            this.userToken = user.tokenString;
                            localStorage.setItem('JwSToken', user.tokenString);
                            localStorage.setItem('userName', model.username);
                          }
                        }
                );
  }

}
