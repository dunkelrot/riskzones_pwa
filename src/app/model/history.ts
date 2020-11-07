import {DateTime} from 'luxon';

const MAX_DATES_COUNT = 7;

export function stripDate(date: string): string {
  return date.substring(0, date.length - date.indexOf('00:00 Uhr') + 1);
}

export function toDateTime(date: string): DateTime {
  return DateTime.fromFormat(date, 'dd.LL.yyyy').minus({days: 0});
}


export class HistoryRecord {
  constructor(public dateTime: DateTime, public cases7from100k: number, public casesPer100k: number) {
  }
}

export class ZoneHistoryRecord {
  records: Array<HistoryRecord>;

  constructor(public id: number) {
    this.records = new Array<HistoryRecord>();
  }

  updateOrPushCasesForDate(recordToAdd: HistoryRecord): void {
    let found = false;
    this.records.forEach((record) => {
      if (record.dateTime.toMillis() === recordToAdd.dateTime.toMillis()) {
        record.cases7from100k = recordToAdd.cases7from100k;
        record.casesPer100k = recordToAdd.casesPer100k;
        found = true;
      }
    });
    if (!found) {
      if (this.records.length >= MAX_DATES_COUNT) {
        this.records.shift();
      }
      this.records.push(recordToAdd);
    }
  }

  getDiffInPercentToYesterday(): number {
    let result = 0;
    if (this.records.length >= 2) {
      const today = this.records[this.records.length - 1];
      // is the last record from today?
      const diff = today.dateTime.diffNow('hours').hours;
      if (diff > -24) {
        const yesterday = this.records[this.records.length - 2];
        // is the previous record from yesterday?
        if (today.dateTime.diff(yesterday.dateTime, ['days']).days === 1) {
          result = today.cases7from100k / yesterday.cases7from100k - 1;
        }
      }
    }
    return result * 100;
  }
}


export class ZonesHistory {

  zones: Map<number, ZoneHistoryRecord>;

  constructor() {
    this.zones = new Map<number, ZoneHistoryRecord>();
  }

  getEntryById(id: number): ZoneHistoryRecord {
    return this.zones.get(id);
  }

  addEntry(id: number, date: string, cases7from100k: number, casesPer100k: number): void {
    const recordToAdd = new HistoryRecord(toDateTime(date), cases7from100k, casesPer100k);
    let historyEntry = this.getEntryById(id);
    if (historyEntry !== undefined) {
      historyEntry.updateOrPushCasesForDate(recordToAdd);
    } else {
      historyEntry = new ZoneHistoryRecord(id);
      historyEntry.updateOrPushCasesForDate(recordToAdd);
      this.zones.set(id, historyEntry);
    }
  }

  getDiffInPercentToYesterday(id: number): number {
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
        entry.dates.push({
          date: record.dateTime.toFormat('dd.LL.yyyy'),
          cases7from100k: record.cases7from100k,
          cases7Per100k: record.cases7from100k,
          casesPer100k: record.casesPer100k,
        });
      });
      zonesToSave.push(entry);
    });
    localStorage.setItem('history', JSON.stringify(zonesToSave));
  }

  load(): void {
    this.zones.clear();
    const historyLS = localStorage.getItem('history');
    if (historyLS !== null) {
      try {
        const history = JSON.parse(historyLS);
        history.forEach((zone: any) => {
          const historyZoneEntry = new ZoneHistoryRecord(zone.id);
          this.zones.set(zone.id, historyZoneEntry);
          zone.dates.forEach(date => {
            let casesPer100k = 0;
            if (date.casesPer100k !== undefined) {
              casesPer100k = date.casesPer100k;
            }
            const historyDateEntry = new HistoryRecord(toDateTime(date.date), date.cases7from100k, casesPer100k);
            historyZoneEntry.records.push(historyDateEntry);
          });
        });
      } catch (ex) {
        this.zones.clear();
        localStorage.removeItem('history');
      }
    }
  }

}
