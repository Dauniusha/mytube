import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { onboardingGuard } from './core/guards/onboarding.guard';

import { ErrorComponent } from './core/pages/error/error.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./youtube/pages/main/main.module').then((m) => m.MainModule),
    canActivate: [AuthenticationGuard, onboardingGuard()],
  },
  {
    path: 'profile/:username',
    loadComponent: () => import('./youtube/pages/profile/profile.component').then((c) => c.ProfileComponent),
    canActivate: [AuthenticationGuard, onboardingGuard()],
  },
  {
    path: 'channel/:alias',
    loadComponent: () => import('./youtube/pages/channel/channel.component').then((c) => c.ChannelComponent),
    canActivate: [AuthenticationGuard, onboardingGuard()],
  },
  {
    path: 'videos/create',
    loadComponent: () => import('./youtube/pages/create-video/create-video.component').then((c) => c.CreateVideoComponent),
    canActivate: [AuthenticationGuard, onboardingGuard()],
  },
  {
    path: 'videos/:videoId',
    loadComponent: () => import('./youtube/pages/video/video.component').then((c) => c.VideoComponent),
    canActivate: [AuthenticationGuard, onboardingGuard()],
  },
  {
    path: 'create',
    loadChildren: () => import('./core/pages/create-card/create-card.module').then((m) => m.CreateCardModule),
    canActivate: [AuthenticationGuard, onboardingGuard()],
  },
  {
    path: 'identity',
    loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./youtube/onboarding/onboarding.module').then((m) => m.OnboardingModule),
    canActivate: [AuthenticationGuard],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard],
})
export class AppRoutingModule { }
