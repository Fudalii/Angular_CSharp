import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GuardLoginService } from './_guards/guardLogin.guard';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolve/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolve/member-edit.resolver';
import { PreventUnSaveGuard } from './_guards/preventUnSave.guard';
import { MemberListResolver } from './_resolve/member-list.resolver';
import { LikeListResolver } from './_resolve/like-list.resolver';



const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'members',
    component: MemberListComponent,
    canActivate: [GuardLoginService],
    resolve: { users: MemberListResolver }
  },
  {
    path: 'members/:id',
    component: MemberDetailComponent,
    resolve: { user: MemberDetailResolver },
    canActivate: [GuardLoginService]
  },
  {
    path: 'member/edit',
    component: MemberEditComponent,
    resolve: { user: MemberEditResolver },
    canActivate: [GuardLoginService],
    canDeactivate: [PreventUnSaveGuard]
  },
  {
    path: 'list',
    component: ListsComponent,
    canActivate: [GuardLoginService],
    resolve: { users: LikeListResolver }
  },
  {
    path: 'messages',
    component: MessagesComponent,
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
