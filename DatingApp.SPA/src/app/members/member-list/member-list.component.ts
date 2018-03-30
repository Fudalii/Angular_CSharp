import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/User';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { PaginatedResult, Pagination } from '../../_models/pagination';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

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
    private _authService: AuthService
  ) {}

  users: User[];
  pagination: Pagination;
  curentPage: number;
  totalItems: number;

  // filtrowanie
  filterForm: NgForm;
  user: User = JSON.parse(localStorage.getItem('userToRetturn'));
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' }
  ];

  userParama: any = {}; // uzupełniane w ngOnInit


  ngOnInit() {
    this._route.data.subscribe((data: PaginatedResult<User[]>) => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.totalItems = this.pagination.TotalItems;
    this.curentPage = this.pagination.CurentPage;

    this.userParama.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParama.minAge = 18;
    this.userParama.maxAge = 99;
  }

  loadUsers() {
    this._userService
      .getUsers(this.pagination.CurentPage, this.pagination.ItemsPerPage, this.userParama)
      .subscribe(res => {
        this.users = res.result;
        this.curentPage = res.pagination.CurentPage;
        this.totalItems = res.pagination.TotalItems;
      });
  }

  pageChanged(event: any): void {
    this.pagination.CurentPage = event.page;
    this.loadUsers();
  }

  filterList() {
     this.loadUsers();
  }

  resetFilder(filterForm) {

       this.userParama.gender = this.user.gender === 'female' ? 'male' : 'female';
       this.userParama.minAge = 18;
       this.userParama.maxAge = 99;
       this.loadUsers();

  }
}
