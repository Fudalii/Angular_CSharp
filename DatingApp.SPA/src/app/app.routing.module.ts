import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ValuesComponent } from './values/values.component';
import { LoginComponent } from './login/login.component';
import { GuardLoginService } from './login/guardLogin.service';


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'values',
    component: ValuesComponent,
    canActivate: [GuardLoginService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], // rejestracja
  exports: [RouterModule] // export
})
export class AppRoutingModule {}
