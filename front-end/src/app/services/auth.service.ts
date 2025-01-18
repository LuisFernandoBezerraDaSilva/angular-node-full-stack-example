import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<any> {
  private authEndpoint: string = 'auth';

  constructor(http: HttpClient) {
    super(http);
  }

  login(credentials: { username: string, password: string }) {
    return this.http.post(`${this.baseUrl}/${this.authEndpoint}/login`, credentials);
  }

  logout() {
    return this.http.post(`${this.baseUrl}/${this.authEndpoint}/logout`, {});
  }
}