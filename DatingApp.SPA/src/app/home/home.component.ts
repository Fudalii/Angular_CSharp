import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  values: any;

  registerMode = '';

  constructor() {}

  ngOnInit() {
  }

  registerToggle(toggle) {
    this.registerMode = toggle;
  }


  cancelRegisterParent(event) {
     this.registerMode = event;
     console.log(this.registerMode);
  }

}
