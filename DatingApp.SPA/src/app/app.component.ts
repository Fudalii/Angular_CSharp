import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{


 urlMainPhoto: any;


constructor(private authService: AuthService) {}

ngOnInit() {
  // przypisanie wartoci do pól w authService. Inaczej po odwieżeniu strony dane te
  // znikają (bo metoda logowania POST wykonywana jest tylko jeden raz po czym referencej zniak)

  const token = localStorage.getItem('JwSToken');
  if (token) {
     this.authService.decodeToken = this.authService.jwtHelper.decodeToken(token);
  }

  const curentUser = localStorage.getItem('userToRetturn');
  if (curentUser) {
     this.authService.curentUser = JSON.parse(curentUser);
     this.urlMainPhoto = this.authService.curentUser.photoUrl;
     this.authService.changeMemberPhoto(this.urlMainPhoto);
  }
}

}
