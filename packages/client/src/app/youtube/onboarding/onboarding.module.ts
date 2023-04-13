import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CreateChannelComponent } from './pages/create-channel/create-channel.component';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { CreateProfileApi } from './api/create-profile.api';
import { CreateChannelApi } from './api/create-channel.api';

@NgModule({
  providers: [
    CreateProfileApi,
    CreateChannelApi,
  ],
  declarations: [
    CreateChannelComponent,
    CreateProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatIconModule,
    OnboardingRoutingModule,
    MatButtonModule,
    MatSelectCountryModule,
  ],
})
export class OnboardingModule { }
