import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ValuesComponent } from './values/values.component';
import { LoginComponent } from './login/login.component';
import { GuardLoginService } from './login/guardLogin.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'members',
    component: MemberListComponent,
    canActivate: [GuardLoginService]
  },
  {
    path: 'list',
    component: ListsComponent,
    canActivate: [GuardLoginService]
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [GuardLoginService]
  },
  {
    path: 'values',
    component: ValuesComponent,
    canActivate: [GuardLoginService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], // rejestracja
  exports: [RouterModule] // export
})
export class AppRoutingModule {}
