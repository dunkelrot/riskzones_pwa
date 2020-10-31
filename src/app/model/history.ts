import {DateTime} from 'luxon';

const MAX_DATES_COUNT = 2;

export function stripDate(date: string): string {
  return date.substring(0, date.length - date.indexOf('00:00 Uhr') + 1);
}

export function toDateTime(date: string): DateTime {
  return DateTime.fromFormat(date, 'dd.LL.yyyy').minus({days: 0});
}
export class HistoryRecord {
  constructor(public dateTime: DateTime, public cases7from100k: number) {
  }
}


export class ZoneHistoryRecord {
  records: Array<HistoryRecord>;

  constructor(public id: string) {
    this.records = new Array<HistoryRecord>();
  }

  updateOrPushCasesForDate(date: string, cases7from100k: number): void {
    const dateTime = toDateTime(date);
    let found = false;
    this.records.forEach((record) => {
      if (record.dateTime.toMillis() === dateTime.toMillis()) {
        record.cases7from100k = cases7from100k;
        found = true;
      }
    });
    if (!found) {
      if (this.records.length >= MAX_DATES_COUNT) {
        this.records.shift();
      }
      this.records.push(new HistoryRecord(dateTime, cases7from100k));
    }
  }

  getDiffInPercentToYesterday(): number{
    let result = 0;
    if (this.records.length >= 2) {
      const today = this.records[this.records.length - 1];
      // is the last record from today?
      const diff = today.dateTime.diffNow('hours').hours;
      if (diff > -24) {
        const yesterday = this.records[this.records.length - 2];
        // is the previous record from yesterday?
        if (today.dateTime.diff(yesterday.dateTime, ['days']).days === 1) {
          result = yesterday.cases7from100k / today.cases7from100k - 1;
        }
      }
    }
    return result;
  }
}


export class ZonesHistory {

  zones: Map<string, ZoneHistoryRecord>;

  constructor() {
    this.zones = new Map<string, ZoneHistoryRecord>();
  }

  getEntryById(id: string): ZoneHistoryRecord {
    return this.zones.get(id);
  }

  addEntry(id: string, date: string, cases7from100k: number): void {
    let historyEntry = this.getEntryById(id);
    if (historyEntry !== undefined) {
      historyEntry.updateOrPushCasesForDate(date, cases7from100k);
    } else {
      historyEntry = new ZoneHistoryRecord(id);
      historyEntry.updateOrPushCasesForDate(date, cases7from100k);
      this.zones.set(id, historyEntry);
    }
  }

  getDiffInPercentToYesterday(id: string): number {
    let result = 0;
    const historyEntry = this.getEntryById(id);
    if (historyEntry !== undefined) {
      result = historyEntry.getDiffInPercentToYesterday();
    }
    return result;
  }

  save(): void {
    const zonesToSave = [];
    this.zones.forEach((zoneHistoryEntry) => {
      const entry = {id: zoneHistoryEntry.id, dates: []};
      zoneHistoryEntry.records.forEach(record => {
        entry.dates.push({date: record.dateTime.toFormat('dd.LL.yyyy'), cases7from100k: record.cases7from100k});
      });
      zonesToSave.push(entry);
    });
    localStorage.setItem('history', JSON.stringify(zonesToSave));
  }

  load(): void {
    this.zones.clear();
    const historyLS = localStorage.getItem('history');
    if (historyLS !== undefined) {
      try {
        const history = JSON.parse(historyLS);
        history.forEach((zone: any) => {
          const historyZoneEntry = new ZoneHistoryRecord(zone.id);
          this.zones.set(zone.id, historyZoneEntry);
          zone.dates.forEach(date => {
            const historyDateEntry = new HistoryRecord(DateTime.fromFormat(date.date, 'dd.LL.yyyy'), date.cases7from100k);
            historyZoneEntry.records.push(historyDateEntry);
          });
        });
      } catch (ex) {
        localStorage.removeItem('history');
      }
    }
  }

}