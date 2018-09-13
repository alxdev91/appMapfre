import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { StoreService } from 'services/store.service';

const RESPONSE = {
  REGISTER_OK: {
    status: 'OK'
  },
  AUTHENTICATE_OK: {
    status: true
  },
  AUTHENTICATE_KO: {
    status: false
  }
};

@Injectable()
export class StoreMock extends StoreService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  public registerUser(payload: object): Observable<any> {
    return Observable.create((observer) => {
      setTimeout(() => {
        observer.next(RESPONSE.REGISTER_OK);
        observer.complete();
      }, 1000);
    });
  }

  public authenticateUser(payload: object): Observable<any> {
    return Observable.create((observer) => {
      setTimeout(() => {
        observer.next(RESPONSE.AUTHENTICATE_OK);
        observer.complete();
      }, 1000);
    });
  }
}
