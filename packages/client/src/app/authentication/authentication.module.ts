import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    AuthenticationRoutingModule,
    SharedModule,
  ],
})
export class AuthenticationModule { }
