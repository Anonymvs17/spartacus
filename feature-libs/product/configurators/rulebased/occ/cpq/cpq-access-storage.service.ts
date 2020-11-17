import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cpq } from '../../cpq/cpq.models';
import { CpqAccessLoaderService } from './cpq-access-loader.service';

@Injectable({ providedIn: 'root' })
export class CpqAccessStorageService {
  constructor(protected cpqAccessLoaderService: CpqAccessLoaderService) {}

  protected cpqAccessData: Observable<Cpq.AccessData>;
  protected requestedAt: number;

  getCachedCpqAccessData(): Observable<Cpq.AccessData> {
    //  if (!this.cpqAccessData) {
    this.requestedAt = Date.now();
    this.cpqAccessData = this.cpqAccessLoaderService.getCpqAccessData();
    /*.pipe(
        publishReplay(1),
        refCount(),
        switchMap((data) => {
          if (this.isTokenExpired(data)) {
            // token expired - fetch a new one and emit it instead
            this.clearCachedCpqAccessData();
            this.cpqAccessData = this.getCachedCpqAccessData();
            return this.cpqAccessData;
          }
          return of(data); // token not expired - emit it.
        })
      );*/
    //  }
    return this.cpqAccessData;
  }

  protected isTokenExpired(tokenData: Cpq.AccessData) {
    return Date.now() > this.requestedAt + tokenData.tokenExpirationTime;
  }

  clearCachedCpqAccessData() {
    this.cpqAccessData = undefined;
  }
}
