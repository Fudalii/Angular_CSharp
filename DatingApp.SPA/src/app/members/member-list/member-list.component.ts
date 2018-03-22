import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/User';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.less']
})
export class MemberListComponent implements OnInit {

  constructor(private _userService: UserService) {}

  users: Array<User> ;

  ngOnInit() {
    this.getUsers();
  }


  getUsers() {
    this._userService.getUsers().subscribe(u => {
              console.log(u);
              this.users = u;
            });
  }

}
