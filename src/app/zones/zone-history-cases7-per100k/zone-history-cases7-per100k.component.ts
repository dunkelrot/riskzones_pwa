import {Component, Input, OnInit} from '@angular/core';
import {Zone} from '../../model/zones';
import {DataEntry} from '../../model/graph';
import {RKIService} from '../../services/rki-service';
import {ZoneHistoryRecord} from '../../model/history';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-zone-history-cases7-per100k',
  templateUrl: './zone-history-cases7-per100k.component.html',
  styleUrls: ['./zone-history-cases7-per100k.component.css']
})
export class ZoneHistoryCases7Per100kComponent implements OnInit {

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
          dataEntry.value = record.cases7from100k;
          dataEntry.color = Zone.zoneColor(record.cases7from100k);
        }
      });
      date = date.minus({days: 1});
    }

    dataSet.reverse();
    return dataSet;
  }
}
