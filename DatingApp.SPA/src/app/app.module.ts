import {NgxGalleryModule} from 'ngx-gallery';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponent } from './login/login.component';
import { AlertifyService } from './_services/alertify.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { UserService } from './_services/user.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { AuthModule } from './_services/auth/auth.module';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolve/member-detail.resolver';
import { MemberListResolver } from './_resolve/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolve/member-edit.resolver';
import { PreventUnSaveGuard } from './_guards/preventUnSave.guard';
import { GuardLoginService } from './_guards/guardLogin.guard';
import { MemberPhotoEditComponent } from './members/member-edit/member-photo-edit/member-photo-edit.component';
import { FileUploadModule } from 'ng2-file-upload';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    MemberListComponent, MemberCardComponent, MemberDetailComponent, MemberEditComponent, MemberPhotoEditComponent,
    MessagesComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(), TabsModule.forRoot(),
    AuthModule,
    NgxGalleryModule,
    FileUploadModule
  ],
  providers: [
    AuthService,
    GuardLoginService, PreventUnSaveGuard,
    AlertifyService,
    UserService,
    MemberDetailResolver, MemberListResolver, MemberEditResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
