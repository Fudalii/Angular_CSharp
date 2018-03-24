import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/User';
import { AlertifyService } from '../../_services/alertify.service';
import { NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery';
import { NgxGalleryImage } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.less']
})
export class MemberDetailComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _alert: AlertifyService
  ) {}

  user: User;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit() {
    this._route.data.subscribe(
      data => (this.user = data['user']),
      error => this._alert.error('Błąd pobierania danych')
    );

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getUserPhosots();

  }

  getUserPhosots() {

    const imagesUrl = [];

      for (let i = 0; i < this.user.photos.length; i++) {

        const photoUrl = this.user.photos[i].url;

          imagesUrl.push({
              small: photoUrl,
              medium: photoUrl,
              big: photoUrl,
              description: this.user.photos[i].description
            });
          }

      return imagesUrl;
  }


  // getUser() {
  //   this._userService.getUser( this._route.snapshot.params['id'])
  //     .subscribe(u => this.user = u);
  // }

}
