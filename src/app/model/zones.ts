import {stripDate} from './history';

export function roundUp(num, precision): number {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}

export interface ZoneFilter {
  enabled: boolean;
  filter(zone: Zone): boolean;
}

export class ZoneNameFilter implements ZoneFilter {
  enabled = false;

  constructor(public filterValue: string) {
  }

  filter(zone: Zone): boolean {
    return zone.nameLC.includes(this.filterValue);
  }
}

export class ZoneSelectedFilter implements ZoneFilter {
  enabled = false;

  constructor(private filterValue: boolean) {
  }

  filter(zone: Zone): boolean {
    return zone.selected === this.filterValue;
  }
}

export class Zone {
  id = 0;
  name = '';
  nameLC = '';
  description = '';
  updateDate = '';
  populationBL = 0.0;
  population = 0.0;

  cases7Per100k = 0.0;
  casesPer100k = 0.0;
  cases7BlPer100k = 0.0;
  cases = 0.0;
  deaths = 0.0;

  region = '';
  selected = false;
  positionIndex = 0;

}

export class ZoneList {

  zones: Zone[] = [];
  constructor(public valid = true) {
  }

  public add(zone: Zone): void {
    this.zones.push(zone);
  }

  public sortByName(): ZoneList {
    this.zones.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return this;
  }

  public sortByPositionIndex(): ZoneList {
    this.zones.sort((a, b) => {
      if (a.positionIndex > b.positionIndex) {
        return 1;
      } else if (a.positionIndex < b.positionIndex) {
        return -1;
      } else {
        return 0;
      }
    });
    return this;
  }

  public getByIdOrNull(id: number): Zone {
    let result = null;
    this.zones.forEach((zone) => {
      if (zone.id === id) {
        result = zone;
      }
    });
    return result;
  }

  public setSelectedByID(id: number): void {
    this.zones.forEach((zone) => {
      if (zone.id === id) {
        zone.selected = true;
      }
    });
  }

  public getSelected(): ZoneList {
    const result = new ZoneList();
    this.zones.forEach((zone) => {
      if (zone.selected) {
        result.add(zone);
      }
    });
    return result;
  }

  public filter(filters: Array<ZoneFilter>): ZoneList {
    const result = new ZoneList();
    this.zones.forEach((zone) => {
      let check = true;
      filters.forEach((filter) => {
        if (filter.enabled) {
          check = check && filter.filter(zone);
        }
      });
      if (check) {
        result.add(zone);
      }
    });
    return result;
  }

  saveSelectedIfValid(): void {
    if (this.valid) {
      const selected = [];
      this.zones.forEach((zone) => {
        if (zone.selected) {
          selected.push({id: zone.id, selected: true, position: zone.positionIndex});
        }
      });
      localStorage.setItem('session', JSON.stringify(selected));
    }
  }

  loadSelected(): void {
    const session = localStorage.getItem('session');
    if (session !== null) {
      try {
        const selected = JSON.parse(session);
        selected.forEach((entry) => {
          const zone = this.getByIdOrNull(entry.id);
          if (zone !== null) {
            zone.selected = true;
            zone.positionIndex = entry.position;
          }
        });
      } catch (ex) {
        localStorage.removeItem('session');
        throw Error('Liste der ausgewählten Land/Stadtkreise fehlerhaft.');
      }
    }
  }
}

export class ZoneListFactory {
  static buildZoneList(json: any): ZoneList {
    const zoneList = new ZoneList();
    if (json.features !== undefined) {
      json.features.forEach((zone) => {
        zoneList.zones.push(ZoneFactory.buildZone(zone.attributes));
      });
      zoneList.sortByName();
    }
    return zoneList;
  }
}

export class ZoneFactory {
  static buildZone(json: any): Zone {
    const zone = new Zone();
    zone.id = json.OBJECTID;
    zone.name = json.GEN;
    zone.nameLC = zone.name.toLocaleLowerCase();
    zone.description = json.BEZ;
    zone.updateDate = stripDate(json.last_update);
    zone.region = json.BL;

    zone.population = json.EWZ;
    zone.populationBL = json.EWZ_BL;
    zone.cases = json.cases;
    zone.cases7Per100k = roundUp(json.cases7_per_100k, 1);
    zone.casesPer100k = roundUp(json.cases_per_100k, 1);
    zone.cases7BlPer100k = roundUp(json.cases7_bl_per_100k, 1);
    zone.deaths = json.deaths;

    zone.selected = false;
    return zone;
  }
}
