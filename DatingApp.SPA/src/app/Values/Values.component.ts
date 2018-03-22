import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_http/Http.service';
import { Values } from '../_models/Values';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.less']
})
export class ValuesComponent implements OnInit {
  values: Values;

  constructor(private _auth: UserService) {}

  ngOnInit(): void {

  }

  Pobierz() {
    this._auth.getUsers().subscribe(
      u => console.log(u)
    );
  }
}
