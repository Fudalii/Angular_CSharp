import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ValuesComponent } from './values/values.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './_http/Http.service';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponent } from './login/login.component';
import { GuardLoginService } from './login/guardLogin.service';
import { AlertifyService } from './_services/alertify.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';



@NgModule({
  declarations: [
    AppComponent,
    ValuesComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    MemberListComponent,
    MessagesComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    BsDropdownModule.forRoot()
  ],
  providers: [HttpService, AuthService, GuardLoginService, AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
