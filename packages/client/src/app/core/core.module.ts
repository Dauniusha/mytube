import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './pages/header/header.module';
import { HeaderComponent } from './pages/header/header.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderModule,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class CoreModule { }
