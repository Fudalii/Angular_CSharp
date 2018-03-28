import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photos } from '../../../_models/Photos.ts';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../_services/auth.service';
import { UserService } from '../../../_services/user.service';
import { AlertifyService } from '../../../_services/alertify.service';


@Component({
  selector: 'app-member-photo-edit',
  templateUrl: './member-photo-edit.component.html',
  styleUrls: ['./member-photo-edit.component.less']
})
export class MemberPhotoEditComponent implements OnInit {

  @Input() photos: Photos[];

  @Output() getPhotoOutput = new EventEmitter<string>();

  baseUrl = environment.apiUrl;

  curentMain: Photos;

  photoUrl: string;


  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _alert: AlertifyService
  ) {}

  ngOnInit() {
    this.initialUpload();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;

  }

  initialUpload() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this._authService.decodeToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('JwSToken'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {

        if (response) {
          const res: Photos = JSON.parse(response);
          const photo = {
            id: res.id,
            url: res.url,
            dateAdded: res.dateAdded,
            description: res.description,
            isMain: res.isMain
          };
          this.photos.push(photo);

          if (photo.isMain) {
            this._authService.changeMemberPhoto(photo.url);
            this._authService.curentUser.photoUrl = photo.url;
            localStorage.setItem('userToRetturn', JSON.stringify(this._authService.curentUser));
          }
        }

      };
    }


  setMainPhoto(photo: Photos) {
    const userId = this._authService.decodeToken.nameid;
    this._userService.setMainPhoto(userId, photo.id).subscribe(
      p => {
        console.log('OK');
        this.curentMain = this.photos.find( x => x.isMain === true);
        this.curentMain.isMain = false;
        photo.isMain = true;

       this._authService.changeMemberPhoto(photo.url);
       this._authService.curentUser.photoUrl = photo.url;
       localStorage.setItem('userToRetturn', JSON.stringify(this._authService.curentUser));

        //this._authService.curentPhotoUrl.subscribe(p => (this.urlPhoto = p));
    } );
  }

  deletePhoto(id: number) {

       this._userService.deletePhoto( this._authService.decodeToken.nameid , id)
      .subscribe( x => {

        const indexDeletePhoto = this.photos.findIndex( photo => photo.id === id);

        this.photos.splice(indexDeletePhoto, 1);

        this._alert.success('Zdjęcie usunięte');

      } );
  }


}
