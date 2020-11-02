import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {ZoneList, ZoneListFactory} from '../model/zones';
import {catchError, map, retry} from 'rxjs/operators';
import {ZonesHistory} from '../model/history';


@Injectable()
export class RKIService {

  private history = new ZonesHistory();
  private zoneList: ZoneList = null;
  private api = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID,BEZ,GEN,last_update,cases7_per_100k,BL&returnGeometry=false&outSR=4326&f=json';
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  private errorHandler(error: Error | any): Observable<never> {
    return throwError(error);
  }

  getLoadZones(): Observable<ZoneList> {
    return this.http.get(this.api).pipe(
      retry(3),
      map((rawData: any) => {
        this.zoneList = ZoneListFactory.buildZoneList(rawData);
        this.zoneList.loadSelected();

        this.history.load();
        this.zoneList.zones.forEach(zone => {
          this.history.addEntry(zone.id, zone.updateDate, zone.cases7from100k);
        });
        this.history.save();

        return this.zoneList;
      }),
      catchError(this.errorHandler)
    );
  }

  getZones(): Observable<ZoneList> {
    if (this.zoneList == null) {
      return this.getLoadZones();
    } else {
      return of(this.zoneList);
    }
  }

  getHistory(): ZonesHistory {
    return this.history;
  }
}
