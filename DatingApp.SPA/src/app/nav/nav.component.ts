import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Values } from '../Modes/Values';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  model: LoginData = new LoginData();
  userName = localStorage.getItem('userName');

  constructor(private authService: AuthService) {}

  ngOnInit() {}

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
