import {Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ValuesComponent } from './values/values.component';


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'values',
    component: ValuesComponent
  }
];



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], // rejestracja
  exports: [RouterModule] // export
})
export class AppRoutingModule {}
