import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

const SERVICE_NAME = {
  REGISTER: 'register',
  AUTHENTICATE: 'authenticate'
};

const SERVICE = {};
SERVICE[SERVICE_NAME.REGISTER] = 'create_user';
SERVICE[SERVICE_NAME.AUTHENTICATE] = 'authenticate_user';

@Injectable()
export class StoreService {

  private url: string = 'http://35.206.70.216/mapfre/app/facephi/';

  constructor(public httpClient: HttpClient) {}

  public registerUser(payload: object): Observable<any> {
    return this.callService(SERVICE_NAME.REGISTER, payload);
  }

  public authenticateUser(payload: object): Observable<any> {
    return this.callService(SERVICE_NAME.AUTHENTICATE, payload);
  }

  private callService(serviceName: string, payload: object): Observable<any> {
    const url = `${this.url}${SERVICE[serviceName]}`;

    return this.httpClient.post(url, payload);
  }
}
