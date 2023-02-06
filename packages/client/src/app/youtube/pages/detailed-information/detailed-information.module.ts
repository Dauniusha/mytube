import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailedInformationComponent } from './detailed-information.component';
import { DetailedInformationRoutingModule } from './detailed-information-routing.module';

@NgModule({
  declarations: [
    DetailedInformationComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    DetailedInformationRoutingModule,
  ],
})
export class DetailedInformationModule { }
