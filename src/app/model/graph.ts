import {DateTime} from 'luxon';

export class DataEntry {
  constructor(public dateTime: DateTime, public value: number, public color: string) {}
}
