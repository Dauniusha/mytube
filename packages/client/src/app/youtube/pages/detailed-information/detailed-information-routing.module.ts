import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailedInformationComponent } from './detailed-information.component';

const routes: Routes = [
  { path: '', component: DetailedInformationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailedInformationRoutingModule { }
