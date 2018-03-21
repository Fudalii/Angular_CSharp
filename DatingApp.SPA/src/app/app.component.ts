import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{



constructor(private authService: AuthService) {}

ngOnInit() {
  const token = localStorage.getItem('JwSToken');
  if (token) {
     this.authService.decodeToken = this.authService.jwtHelper.decodeToken(token);
  }
}

}
