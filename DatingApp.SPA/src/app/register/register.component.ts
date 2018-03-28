import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthData } from '../_models/authData';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  userData: User; // model tylko do rejestracji

  registerForm: FormGroup;

  @Input() valuesFromHome: any;

  @Output() cancelRegisterMode = new EventEmitter();

  bsConfig: Partial<BsDaterangepickerConfig>;

  constructor(private _authService: AuthService, private _formBuilder: FormBuilder) {}

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

  }

  buildRegisterForm() {

      this.registerForm =  this._formBuilder.group({
          gender: ['male'],
          userName: ['', [Validators.minLength(3)]],
          knownAs: ['', Validators.required],
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

  register() {

    if (this.registerForm.valid) {
      this.userData = Object.assign({}, this.registerForm.value);
      this._authService.register(this.userData);

    }


  }

  cancelRegister() {
    this.cancelRegisterMode.emit('');
  }

}
