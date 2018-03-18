import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthData } from '../Modes/authData';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  userData = new AuthData();

  @Input() valuesFromHome: any;

  @Output() cancelRegisterMode = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  register(data: NgForm) {
    this.userData.username = data.controls['username'].value;
    this.userData.password = data.controls['password'].value;
    this.authService.register(this.userData).subscribe(x => console.log(x));

  }

  cancelRegister() {
    this.cancelRegisterMode.emit('');
  }

}
