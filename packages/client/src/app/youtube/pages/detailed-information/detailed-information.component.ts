import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { setting } from 'src/app/settings/setting';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoadingService } from 'src/app/core/services/loader/loading.service';
import { ICardData } from '../../models/card-data-interface';

@Component({
  selector: 'app-detailed-information',
  templateUrl: './detailed-information.component.html',
  styleUrls: ['./detailed-information.component.scss'],
})
export class DetailedInformationComponent implements OnInit {
  public previewLink: string = '';

  public date: Date = new Date();

  public data?: ICardData;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public loadingService: LoadingService,
  ) { }

  public ngOnInit(): void {
    /* this.httpService.response$.subscribe((cardsData: ICardData[]) => {
      this.data = cardsData.find((card) => card.id === this.activatedRoute.snapshot.params.id);

      if (this.data) {
        this.date = new Date(this.data.date);
        this.previewLink = setting.urlConstants.previewLink + this.data.id + setting.urlConstants.previewQuality.default;
      } else {
        this.router.navigate(['']); // TODO: create special page for bad request
      }

      this.loadingService.loaded();
    }); */

    this.loadingService.loading();

    const { id } = this.activatedRoute.snapshot.params;

    this.httpService.getCardById(id);

    this.httpService.detailedCardData.subscribe((cardsData: ICardData[]) => {
      [this.data] = cardsData;

      if (this.data) {
        this.date = new Date(this.data.date);

        this.previewLink = this.data.imgLink
          ? this.data.imgLink
          : setting.urlConstants.previewLink + this.data.id + setting.urlConstants.previewQuality.default;
      } else {
        this.router.navigate(['']); // TODO: create special page for bad request
      }

      this.loadingService.loaded();
    });
  }
}
