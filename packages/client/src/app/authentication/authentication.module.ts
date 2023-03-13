import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './pages/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    AuthenticationRoutingModule,
    SharedModule,
    MatIconModule,
  ],
})
export class AuthenticationModule { }
