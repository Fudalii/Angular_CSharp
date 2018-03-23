import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/User';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.less']
})
export class MemberListComponent implements OnInit {

  constructor(private _userService: UserService, private _alert: AlertifyService, private _route: ActivatedRoute) {}

  users: User[] ;

  ngOnInit() {

    this._route.data.subscribe(data => this.users = data['users']);
  }


  // getUsers() {
  //   this._userService.getUsers().subscribe(u => {
  //             console.log(u);
  //             this.users = u;
  //           }, error  => { console.log(error); this._alert.error('Bład pobierania danych'); }
  //         );
  // }

}
