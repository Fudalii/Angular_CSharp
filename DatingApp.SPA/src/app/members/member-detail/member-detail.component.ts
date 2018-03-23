import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/User';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.less']
})
export class MemberDetailComponent implements OnInit {

  constructor(private _userService: UserService, private _route: ActivatedRoute, private _alert: AlertifyService) { }

  user: User;

  ngOnInit() {
    this._route.data.subscribe( data => this.user = data['user'], error => this._alert.error('Błąd pobierania danych') );
  }

  // getUser() {
  //   this._userService.getUser( this._route.snapshot.params['id'])
  //     .subscribe(u => this.user = u);
  // }

}
