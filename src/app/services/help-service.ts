import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class HelpService {

  private api = environment.server;

  constructor(private http: HttpClient) {
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
