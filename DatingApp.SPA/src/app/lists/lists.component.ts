import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { User } from '../_models/User';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.less']
})
export class ListsComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _alert: AlertifyService,
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) {}

  users: User[];
  pagination: Pagination;
  likesParam: string;

  ngOnInit() {
    this._route.data.subscribe( data  => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
      console.log(this.users);
    });
    this.likesParam = 'Likers';
  }

  loadUsers() {
    console.log(this.likesParam);
    this._userService
      .getUsers(
        this.pagination.CurentPage,
        this.pagination.ItemsPerPage,
        null,
        this.likesParam
      )
      .subscribe(res => {
        this.users = res.result;
        this.pagination = res.pagination;
      });
  }

  pageChanged(event: any): void {
    this.pagination.CurentPage = event.page;
    this.loadUsers();
  }
}
