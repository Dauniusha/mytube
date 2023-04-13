import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileApi } from '../../../core/services/api/profile.api';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
    providers: [ProfileApi],
    declarations: [
        ProfileComponent,
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        ProfileRoutingModule,
        SharedModule,
    ]
})
export class ProfileModule { }
