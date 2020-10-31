import {Component, Input, OnInit} from '@angular/core';
import { Zone } from 'src/app/model/zones';
import {RKIService} from '../../services/rki-service';

@Component({
  selector: 'app-zone-details',
  templateUrl: './zone-details.component.html',
  styleUrls: ['./zone-details.component.css']
})
export class ZoneDetailsComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('zone') zone: Zone;
  diffInPercent = 0;
  trendColor = '';

  constructor(private rkiService: RKIService) { }

  ngOnInit(): void {
    this.diffInPercent = this.rkiService.getHistory().getDiffInPercentToYesterday(this.zone.id);
    if (this.diffInPercent < 0) {
      this.trendColor = '#4fb13f';
    } else if (this.diffInPercent > 0) {
      this.trendColor = '#ec5959';
    }
  }

}
