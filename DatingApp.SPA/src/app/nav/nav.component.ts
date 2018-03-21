import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Values } from '../Modes/Values';
import { AuthService } from '../_services/auth.service';
import { AuthData } from '../Modes/authData';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  model: AuthData = new AuthData();
  // userName = localStorage.getItem('userName');

  uniqueName: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.uniqueName = this.uniqueName = this.authService.decodeToken.unique_name;
  }

  login(loginForm: NgForm) {
    this.model.username = loginForm.controls['username'].value;
    this.model.password = loginForm.controls['password'].value;
    this.authService.login(this.model);
  }



  // testowa() {
  //   console.log(this.userName);
  // }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem('JwSToken');
  }
}

