import {Component, Input, OnInit} from '@angular/core';
import {Zone} from '../../model/zones';
import {DataEntry} from '../../model/graph';
import {RKIService} from '../../services/rki-service';
import {ZoneHistoryRecord} from '../../model/history';
import {DateTime} from 'luxon';
import {SettingsService} from '../../services/settings-service';

@Component({
  selector: 'app-zone-history-cases7-per100k',
  templateUrl: './zone-history-cases7-per100k.component.html',
  styleUrls: ['./zone-history-cases7-per100k.component.css']
})
export class ZoneHistoryCases7Per100kComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('zone') zone: Zone;

  dataSet: Array<DataEntry> = null;

  constructor(private rkiService: RKIService, private settingsService: SettingsService) { }

  ngOnInit(): void {
    const zoneHistory = this.rkiService.getHistory().getEntryById(this.zone.id);
    this.dataSet = this.buildDataSet(zoneHistory);
  }

  private buildDataSet(zoneHistory: ZoneHistoryRecord): Array<DataEntry> {
    const dataSet = new Array<DataEntry>();
    const numEntries = this.settingsService.settings.numberOfRecords;

    let date = DateTime.local().startOf('day');
    for (let ii = 0; ii < numEntries; ii++) {
      const dataEntry = new DataEntry(date, 0, '#ffffff');
      dataSet.push(dataEntry);

      zoneHistory.records.forEach((record) => {
        if (record.dateTime.toMillis() === date.toMillis()) {
          dataEntry.value = record.cases7from100k;
        }
      });
      date = date.minus({days: 1});
    }

    dataSet.reverse();
    return dataSet;
  }
}
