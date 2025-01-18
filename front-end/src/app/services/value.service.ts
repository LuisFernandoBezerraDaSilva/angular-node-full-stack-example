import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ValueService extends BaseService<any> {

  constructor(http: HttpClient, storageService: StorageService) {
    super(http, storageService);
  }

  public getValues(): Observable<any[]> {
    return this.getAll('value');
  }
}