import {Injectable} from '@angular/core';
import {Settings} from '../model/settings';

export function getSettings(settingsService: SettingsService): any {
  return (): Promise<any> => {
    return settingsService.loadFromStorage();
  };
}


@Injectable()
export class SettingsService {

  settings = new Settings();

  loadFromStorage(): Promise<Settings> {
    // noinspection JSUnusedLocalSymbols
    return new Promise<Settings>((resolve, reject) => {
      resolve(this.settings.load());
    });
  }

  saveToStorage(): Settings {
    return this.settings.save();
  }
}
