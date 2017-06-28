import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayService {

  constructor(private http: Http) { }

  getWord(): Observable<any> {
    return this.http.get('/api/words').map(res => res.json());
  }
}
