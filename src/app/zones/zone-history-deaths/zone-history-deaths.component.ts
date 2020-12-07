import {Component, Input, OnInit} from '@angular/core';
import {Zone} from '../../model/zones';
import {DataEntry} from '../../model/graph';
import {RKIService} from '../../services/rki-service';
import {SettingsService} from '../../services/settings-service';
import {ZoneHistoryRecord} from '../../model/history';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-zone-history-deaths',
  templateUrl: './zone-history-deaths.component.html',
  styleUrls: ['./zone-history-deaths.component.css']
})
export class ZoneHistoryDeathsComponent implements OnInit {

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
          dataEntry.value = record.deaths;
        }
      });
      date = date.minus({days: 1});
    }

    dataSet.reverse();
    return dataSet;
  }
}
