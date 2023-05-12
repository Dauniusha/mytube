import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ChannelsApi } from '../../../core/services/api/channels.api';
import { VideosApi } from '../../../core/services/api/videos.api';
import { convertBase64 } from '../../../core/utils/base64-converter';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.scss']
})
export class CreateVideoComponent {
  name = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(60)],
  });

  description = new FormControl('');

  preview: string | null = null;

  video: File | null = null;

  videoInputName = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(
    private readonly videosApi: VideosApi,
    private readonly channelsApi: ChannelsApi,
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) {}

  async uploadPreview(event: any) {
    const file: File = event.target.files[0];

    this.preview = await convertBase64(file);
  }

  async uploadVideo(files: FileList | null) {
    this.video = files?.[0] ?? null;

    if (!this.video) {
      return;
    }

    this.videoInputName.setValue(this.video?.name ?? '');
  }

  createVideo(event: Event) {
    event.preventDefault();

    if (!this.preview) {
      return;
    }

    const savedPreview = this.preview;

    this.channelsApi.getMyChannel()
      .pipe(
        switchMap(({ getMyChannel: myChannel }) => this.videosApi.createVideo({
          chanelId: myChannel.id,
          name: this.name.value,
          preview: savedPreview,
          description: this.description.value,
        })),
        switchMap((data) => {
          const uploadUrl = data?.createVideo.url;

          if (!uploadUrl || !this.video) {
            throw new Error('Invalid form');
          }

          return this.httpClient.put(uploadUrl, this.video);
        }),
      ).subscribe(() => this.router.navigate(['']));
  }
}
