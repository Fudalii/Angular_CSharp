import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('JwSToken');
        },
        whitelistedDomains: ['localhost:5000']
      }
    })
  ],
  declarations: [AuthComponent]
})
export class AuthModule {}
