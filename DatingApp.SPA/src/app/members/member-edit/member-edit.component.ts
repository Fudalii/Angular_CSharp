import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, AfterViewChecked } from '@angular/core';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MemberPhotoEditComponent } from './member-photo-edit/member-photo-edit.component';
import { AuthService } from '../../_services/auth.service';
import { Photos } from '../../_models/Photos.ts';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.less']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;

  user: User;
  urlPhoto: string;

  constructor(
    private _route: ActivatedRoute,
    private _alert: AlertifyService,
    private _userService: UserService,
    private _authService: AuthService
  ) {}

  ngOnInit() {

    this._authService.curentPhotoUrl.subscribe(p => (this.urlPhoto = p));

    this._route.data.subscribe(
      data => (this.user = data['user']),
      error => this._alert.error('Wystąpił błąd')
    );

  }


  updateUser() {
    this._userService
      .updateUser(this.user.id, this.user)
      .subscribe(
        e => console.log(e),
        (error: HttpErrorResponse) => console.log(error.error)
      );

    this._alert.success('Zaminy zapisane poprawnie');
    this.editForm.reset(this.user);
  }

  // updateMainPhoto(photoUrl) {
  //   this._authService.changeMemberPhoto(photoUrl);
  //   this._authService.curentPhotoUrl.subscribe(p => (this.urlPhoto = p));
  // }
}
