import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.less']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(
    private _auth: AuthService,
    private _user: UserService,
    private _alert: AlertifyService

  ) {}

  ngOnInit() {}


  sendLike(id: number) {
    this._user.sendLike(this._auth.decodeToken.nameid, id).subscribe(
      data => { this._alert.success('You have liked: ' + this.user.knownAs); },
      error => { this._alert.error(error.error); }
    );
  }


}
