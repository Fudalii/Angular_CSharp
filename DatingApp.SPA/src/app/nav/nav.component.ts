import { Component, AfterViewInit, OnInit, AfterContentInit, AfterContentChecked, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Values } from '../_models/Values';
import { AuthService } from '../_services/auth.service';
import { AuthData } from '../_models/authData';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  model: AuthData = new AuthData();
  // userName = localStorage.getItem('userName');

  uniqueName: any;
  urlPhoto: string;

  constructor(
    private _authService: AuthService,
    private _alert: AlertifyService
  ) {}

  ngOnInit() {
      // subskrybuję observable z seriwsu dla mainPhotoURL
      this._authService.curentPhotoUrl.subscribe( photoUrl => this.urlPhoto = photoUrl);
  }

  // ngDoCheck() {
  //   this.urlPhoto = this._authService.curentUser.photoUrl;
  // }

  // ngAfterContentChecked() {
  //    this.urlPhoto = this._authService.curentUser.photoUrl;
  // }

  login(loginForm: NgForm) {
    this.model.username = loginForm.controls['username'].value;
    this.model.password = loginForm.controls['password'].value;
    this._authService.login(this.model);
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

