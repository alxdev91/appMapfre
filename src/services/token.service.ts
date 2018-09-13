import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class TokenService {

  private url: string = 'http://api.cemobile.eu/gv/token';

  constructor(public httpClient: HttpClient) {}

  public getToken(type:string): Observable<Object> {

    const url = `${this.url}?tipo=${type}`;

    return this.httpClient.get(url);
  }
}
