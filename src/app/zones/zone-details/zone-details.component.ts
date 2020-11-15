import {Component, Input, OnInit} from '@angular/core';
import { Zone } from 'src/app/model/zones';
import {RKIService} from '../../services/rki-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-zone-details',
  templateUrl: './zone-details.component.html',
  styleUrls: ['./zone-details.component.css']
})
export class ZoneDetailsComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('zone') zone: Zone;
  cases7Per100k = '';
  diffInPercent = 0;
  trendColor = '';

  trendingUp = 'trending_up';
  trendingDown = 'trending_down';

  constructor(private rkiService: RKIService, private router: Router) { }

  ngOnInit(): void {
    const format = new Intl.NumberFormat('de-DE', { style: 'decimal', useGrouping: true, maximumFractionDigits: 1 });
    this.diffInPercent = this.rkiService.getHistory().getDiffInPercentToYesterday(this.zone.id);
    this.cases7Per100k = format.format(this.zone.cases7Per100k);

    if (this.diffInPercent < 0) {
      this.trendColor = '#4fb13f';
    } else if (this.diffInPercent > 0) {
      this.trendColor = '#ec5959';
    }

    const absDiff = Math.abs(this.diffInPercent);
    if (absDiff > 20) {
      this.trendingUp = this.trendingUp + ' ' + this.trendingUp + ' ' + this.trendingUp;
      this.trendingDown = this.trendingDown + ' ' + this.trendingDown + ' ' + this.trendingDown;
    } else if (absDiff > 10) {
      this.trendingUp = this.trendingUp + ' ' + this.trendingUp;
      this.trendingDown = this.trendingDown + ' ' + this.trendingDown;
    }
  }

  onShowInfo(): void {
    this.router.navigate(['/info', this.zone.id]);
  }

  getZoneColor(zone: Zone): string {
    let color = 'riskZero';

    if (zone.cases7Per100k < 10) {
      color = 'riskLT10';
    } else if (zone.cases7Per100k < 20) {
      color = 'riskLT20';
    } else if (zone.cases7Per100k < 35) {
      color = 'riskLT35';
    } else if (zone.cases7Per100k < 50) {
      color = 'riskLT50';
    } else if (zone.cases7Per100k < 100) {
      color = 'riskLT100';
    } else if (zone.cases7Per100k < 200) {
      color = 'riskLT200';
    } else if (zone.cases7Per100k < 300) {
      color = 'riskLT300';
    } else if (zone.cases7Per100k >= 300) {
      color = 'riskGT300';
    }

    return 'crz-color-box ' + color;
  }

}
