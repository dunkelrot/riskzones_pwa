import {Observable, Subject} from 'rxjs';

interface ISettings {
  numberOfRecords: number;
  interpolateMissingRecords: boolean;
  showCasesTotalPer100k: boolean;
  theme: string;
}

export class Settings {

  numberOfRecords = 7;
  interpolateMissingRecords = false;
  showCasesTotalPer100k = true;

  // tslint:disable-next-line:variable-name
  _theme = 'SYSTEM_DEFAULT';

  get theme(): string {
    return this._theme;
  }

  set theme(value) {
    this._theme = value;
    this.subject.next('THEME_CHANGED');
  }

  subject = new Subject<string>();

  reset(): void {
    this.numberOfRecords = 7;
    this.interpolateMissingRecords = false;
    this.showCasesTotalPer100k = true;
  }

  save(): Settings {
    const settings: ISettings = {} as ISettings;
    settings.interpolateMissingRecords = this.interpolateMissingRecords;
    settings.numberOfRecords = this.numberOfRecords;
    settings.showCasesTotalPer100k = this.showCasesTotalPer100k;
    settings.theme = this.theme;
    localStorage.setItem('settings', JSON.stringify(settings));
    return this;
  }

  load(): Settings {
    this.reset();
    const settingsJSON = localStorage.getItem('settings');
    if (settingsJSON !== null) {
      try {
        const settings: ISettings = JSON.parse(settingsJSON) as ISettings;
        if (settings.interpolateMissingRecords !== undefined) {
          this.interpolateMissingRecords = settings.interpolateMissingRecords;
        }
        if (settings.numberOfRecords !== undefined) {
          this.numberOfRecords = settings.numberOfRecords;
        }
        if (settings.showCasesTotalPer100k !== undefined) {
          this.showCasesTotalPer100k = settings.showCasesTotalPer100k;
        }
        if (settings.theme !== undefined) {
          this.theme = settings.theme;
        }
      } catch (ex) {
        localStorage.removeItem('settings');
      }
    }
    return this;
  }

  getUpdates(): Observable<string> {
    return this.subject.asObservable();
  }
}
