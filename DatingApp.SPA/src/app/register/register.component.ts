import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthData } from '../_models/authData';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  userData = new AuthData(); // model tylko do rejestracji
  registerForm: FormGroup;

  @Input() valuesFromHome: any;

  @Output() cancelRegisterMode = new EventEmitter();

  bsConfig: Partial<BsDaterangepickerConfig>;

  constructor(private authService: AuthService, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red' 
    };

    this.buildRegisterForm();

      // this.registerForm = new FormGroup({
      //   username: new FormControl('', Validators.minLength(3)),
      //   password: new FormControl('', [Validators.minLength(3), Validators.maxLength(8)]),
      //   confirmpassword: new FormControl('', Validators.required)
      // } , this.confirmPasswordValidator);

  }_

  buildRegisterForm(){
  this.registerForm =  this._formBuilder.group({
      gender: ['male'],
      username: ['', [Validators.minLength(3)]],
      knowAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.minLength(3), Validators.maxLength(8)]],
      confirmpassword: ['', [Validators.required]]
   }, {validator: this.confirmPasswordValidator});
  }

  confirmPasswordValidator(g: FormGroup) {
      return g.get('password').value === g.get('confirmpassword').value ? null : {'passwordCheck' : true};
  }

  register(data: NgForm) {
    // this.userData.username = data.controls['username'].value;
    // this.userData.password = data.controls['password'].value;
    // this.authService.register(this.userData);
    console.log(this.registerForm.value);
  }

  cancelRegister() {
    this.cancelRegisterMode.emit('');
  }

}
