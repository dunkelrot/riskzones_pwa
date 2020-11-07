import {Component, Input, OnInit} from '@angular/core';
import {RKIService} from '../../services/rki-service';
import {ZoneHistoryRecord} from '../../model/history';
import {DateTime} from 'luxon';
import { Zone } from 'src/app/model/zones';
import {DataEntry} from '../../model/graph';


@Component({
  selector: 'app-zone-history',
  templateUrl: './zone-history-cases-per100k.component.html',
  styleUrls: ['./zone-history-cases-per100k.component.css']
})
export class ZoneHistoryCasesPer100kComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('zone') zone: Zone;

  dataSet: Array<DataEntry> = null;

  constructor(private rkiService: RKIService) { }

  ngOnInit(): void {
    const zoneHistory = this.rkiService.getHistory().getEntryById(this.zone.id);
    this.dataSet = this.buildDataSet(zoneHistory);
  }

  private buildDataSet(zoneHistory: ZoneHistoryRecord): Array<DataEntry> {
    const dataSet = new Array<DataEntry>();

    let date = DateTime.local().startOf('day');
    for (let ii = 0; ii < 7; ii++) {
      const dataEntry = new DataEntry(date, 0, '#ffffff');
      dataSet.push(dataEntry);

      zoneHistory.records.forEach((record) => {
        if (record.dateTime.toMillis() === date.toMillis()) {
          dataEntry.value = record.casesPer100k;
          dataEntry.color = Zone.zoneColor(record.casesPer100k);
        }
      });
      date = date.minus({days: 1});
    }

    dataSet.reverse();
    return dataSet;
  }

}
