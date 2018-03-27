import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photos } from '../../../_models/Photos.ts';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../_services/auth.service';
import { UserService } from '../../../_services/user.service';


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


  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;

  constructor(
    private _authService: AuthService,
    private _userService: UserService
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

        //console.log(response);

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
          console.log(this.photos);

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
        this.getPhotoOutput.emit(photo.url);
    } );
  }

}
