import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class HelpService {

  private api = environment.server;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    // this.headers.append('Content-Type', 'application/json');
  }

  private errorHandler(error: Error | any): Observable<never> {
    return throwError(error);
  }

  get(): Observable<string> {
    return this.http.get(`${this.api}/assets/help/about.md`,  { responseType: 'text'}).pipe(
      retry(3),
      map((rawData: any) => rawData),
      catchError(this.errorHandler)
    );
  }
}
