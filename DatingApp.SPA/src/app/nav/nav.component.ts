import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Values } from '../_models/Values';
import { AuthService } from '../_services/auth.service';
import { AuthData } from '../_models/authData';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  model: AuthData = new AuthData();
  // userName = localStorage.getItem('userName');

  uniqueName: any;

  constructor(private _authService: AuthService, private  _alert: AlertifyService) {}

  ngOnInit() {
    this.uniqueName = this.uniqueName = this._authService.decodeToken.unique_name;
  }

  login(loginForm: NgForm) {
    this.model.username = loginForm.controls['username'].value;
    this.model.password = loginForm.controls['password'].value;
    this._authService.login(this.model);
  }



  // testowa() {
  //   console.log(this.userName);
  // }

  loggedIn() {
    return this._authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem('JwSToken');
    this._alert.message('Wylogowano poprawnie');

  }
}

