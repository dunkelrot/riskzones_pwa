class ZoneColors {
  static riskZero = '#ffffff';
  static riskLT10 = '#f6f0e1';
  static riskLT20 = '#f6dfb8';
  static riskLT35 = '#fdcea5';
  static riskLT50 = '#f18181';
  static riskLT100 = '#e85151';
  static riskLT200 = '#c93232';
  static riskGT200 = '#871212';
}

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
  id = '';
  name = '';
  nameLC = '';
  description = '';
  updateDate = '';
  cases7from100k = 0.0;
  region = '';
  selected = false;
  positionIndex = 0;

  get color(): string {
    if (this.cases7from100k < 10) {
      return ZoneColors.riskLT10;
    } else if (this.cases7from100k < 20) {
      return ZoneColors.riskLT20;
    } else if (this.cases7from100k < 35) {
      return ZoneColors.riskLT35;
    } else if (this.cases7from100k < 50) {
      return ZoneColors.riskLT50;
    } else if (this.cases7from100k < 100) {
      return ZoneColors.riskLT100;
    } else if (this.cases7from100k < 200) {
      return ZoneColors.riskLT200;
    } else {
      return ZoneColors.riskGT200;
    }
  }
}

export class ZoneList {
  zones: Zone[] = [];
  constructor() {
  }

  public add(zone: Zone) {
    this.zones.push(zone);
  }

  public sortByName(): void {
    this.zones.sort((a,b) => {
      return a.name.localeCompare(b.name);
    });
  }

  public setSelectedByID(id: string): void {
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

  save(): void {
    const selected = [];
    this.zones.forEach((zone) => {
      if (zone.selected) {
        selected.push({id: zone.id, selected: true})
      }
    });
    localStorage.setItem('session', JSON.stringify(selected));
  }

  load(): void {
    const session = localStorage.getItem('session');
    if (session !== undefined) {
      try {
        const selected = JSON.parse(session);
        selected.forEach((entry) => {
          this.setSelectedByID(entry.id);
        });
      } catch (ex) {
        // ignored
      }
    }
  }
}

export class ZoneListFactory {
  static buildZoneList(json: any): ZoneList {
    const zoneList = new ZoneList();
    json.features.forEach( (zone) => {
      zoneList.zones.push(ZoneFactory.buildZone(zone.attributes));
    });
    zoneList.sortByName();
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
    zone.updateDate = json.last_update;
    zone.region = json.BL;
    zone.cases7from100k = roundUp(json.cases7_per_100k, 1);
    zone.selected = false;
    return zone;
  }
}
