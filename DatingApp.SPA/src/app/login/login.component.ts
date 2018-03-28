import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthData } from '../_models/authData';
import { User } from '../_models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  user: any = {};
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
    this.user.userName = loginForm.controls['userName'].value;
    this.user.password = loginForm.controls['password'].value;
    this.authService.login(this.user);
  }

  loggedIn() {
    const loggedIn = localStorage.getItem('JwSToken');
    return !!loggedIn;
  }

  logOut() {
    localStorage.removeItem('JwSToken');
  }
}

