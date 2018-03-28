import { Component, AfterViewInit, OnInit, AfterContentInit, AfterContentChecked, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Values } from '../_models/Values';
import { AuthService } from '../_services/auth.service';
import { AuthData } from '../_models/authData';
import { AlertifyService } from '../_services/alertify.service';
import {User} from '../_models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  user: any = {};

  urlPhoto: string;

  constructor(
    private _authService: AuthService,
    private _alert: AlertifyService
  ) {}

  ngOnInit() {
      // subskrybuję observable z seriwsu dla mainPhotoURL
      this._authService.curentPhotoUrl.subscribe( photoUrl => this.urlPhoto = photoUrl);

  }



  login(loginForm: NgForm) {
   this.user.userName = loginForm.controls['userName'].value;
   this.user.password = loginForm.controls['password'].value;
    this._authService.login(this.user);
  }

  loggedIn() {
    return this._authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem('JwSToken');
    localStorage.removeItem('userToRetturn');
    this._alert.message('Wylogowano poprawnie');
  }
}

