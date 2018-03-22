import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../_http/Http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  values: any;

  registerMode = '';

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.Pobierz();
  }

  registerToggle(toggle) {
    this.registerMode = toggle;
  }

  Pobierz() {
    this.httpService.GetVaues().subscribe(x => {
      this.values = x;
      console.log(this.values);
    });
  }

  cancelRegisterParent(event) {
     this.registerMode = event;
     console.log(this.registerMode);
  }

}
