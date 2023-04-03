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
    path: 'video/:id',
    loadChildren: () => import('./youtube/pages/detailed-information/detailed-information.module').then((m) => m.DetailedInformationModule),
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
