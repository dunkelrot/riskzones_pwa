import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, Subject, throwError} from 'rxjs';
import {ZoneList, ZoneListFactory} from '../model/zones';
import {catchError, map, retry} from 'rxjs/operators';


@Injectable()
export class RKIService {

  private subject = new Subject();
  private zoneList: ZoneList = null;
  private api = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?outFields=*&returnGeometry=false&resultOffset=0&f=json&where=1=1';
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
        this.zoneList.load();
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
}
