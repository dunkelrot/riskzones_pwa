import {Component, Input, OnInit} from '@angular/core';
import { Zone } from 'src/app/model/zones';
import {Location} from '@angular/common';
import {RKIService} from '../../services/rki-service';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private rkiService: RKIService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const format = Intl.NumberFormat('de-DE', { style: 'decimal', useGrouping: true, maximumFractionDigits: 1 });
    const params = this.route.snapshot.params;
    if (params.id !== undefined) {
      this.rkiService.getZones().subscribe(zones => {
        const idStr: string = params.id;
        const id = parseInt(idStr, 10);
        this.zone = zones.getByID(id);

        this.population = format.format(this.zone.population);
        this.populationBL = format.format(this.zone.populationBL);
        this.casesPer100k = format.format(this.zone.casesPer100k);
        this.cases7Per100k = format.format(this.zone.cases7Per100k);
        this.cases7Per100kBL = format.format(this.zone.cases7BlPer100k);

      });
    }
  }

  onHome(): void {
    this.location.back();
  }
}
