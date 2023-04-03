import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { onboardingGuard } from '../../core/guards/onboarding.guard';
import { ErrorComponent } from '../../core/pages/error/error.component';
import { CreateChannelComponent } from './pages/create-channel/create-channel.component';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';

const routes: Routes = [
  {
    path: 'channel',
    component: CreateChannelComponent,
    canActivate: [onboardingGuard(2)],
  },
  {
    path: 'profile',
    component: CreateProfileComponent,
    canActivate: [onboardingGuard(1)],
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule { }
