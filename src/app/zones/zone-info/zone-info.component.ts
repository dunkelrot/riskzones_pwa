import {Component, OnInit} from '@angular/core';
import { Zone } from 'src/app/model/zones';
import {Location} from '@angular/common';
import {RKIService} from '../../services/rki-service';
import {ActivatedRoute} from '@angular/router';
import {toDateTime} from '../../model/history';
import {SettingsService} from '../../services/settings-service';

@Component({
  selector: 'app-zone-info',
  templateUrl: './zone-info.component.html',
  styleUrls: ['./zone-info.component.css']
})
export class ZoneInfoComponent implements OnInit {

  zone: Zone = null;

  population = '';
  populationBL = '';
  cases7Per100k = '';
  cases7Per100kBL = '';
  casesPer100k = '';

  isDataFromToday = true;
  showTotalCasesPer100k = false;

  constructor(private rkiService: RKIService, private location: Location, private route: ActivatedRoute,
              private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.showTotalCasesPer100k = this.settingsService.settings.showCasesTotalPer100k;
    const format = Intl.NumberFormat('de-DE', { style: 'decimal', useGrouping: true, maximumFractionDigits: 1 });
    const params = this.route.snapshot.params;
    if (params.id !== undefined) {
      this.rkiService.getZones().subscribe(zones => {
        const idStr: string = params.id;
        const id = parseInt(idStr, 10);
        this.zone = zones.getByIdOrNull(id);

        this.population = format.format(this.zone.population);
        this.populationBL = format.format(this.zone.populationBL);
        this.casesPer100k = format.format(this.zone.casesPer100k);
        this.cases7Per100k = format.format(this.zone.cases7Per100k);
        this.cases7Per100kBL = format.format(this.zone.cases7BlPer100k);

        const date = toDateTime(this.zone.updateDate);
        this.isDataFromToday = date.diffNow('hours').hours <= 24;
      });
    }
  }

  onHome(): void {
    this.location.back();
  }
}
