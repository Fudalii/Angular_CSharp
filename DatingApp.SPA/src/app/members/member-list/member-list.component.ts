import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/User';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.less']
})
export class MemberListComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _alert: AlertifyService,
    private _route: ActivatedRoute,
    private _authService: AuthService) {}

  users: User[] ;
  defaultPhoto: string;

  ngOnInit() {

    this._route.data.subscribe(data => this.users = data['users']);
  }


}
