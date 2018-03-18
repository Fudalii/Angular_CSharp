import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  model: LoginData = new LoginData();
  userName = localStorage.getItem('userName');
  return = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => (this.return = params['return'])
    );
  }

  login(loginForm: NgForm) {
    this.model.username = loginForm.controls['username'].value;
    this.model.password = loginForm.controls['password'].value;
    this.authService.login(this.model);

  }

  testowa() {
    console.log(this.userName);
  }

  loggedIn() {
    const loggedIn = localStorage.getItem('JwSToken');
    return !!loggedIn;
  }

  logOut() {
    localStorage.removeItem('JwSToken');
  }
}

export class LoginData {
  username: string;
  password: string;
}

