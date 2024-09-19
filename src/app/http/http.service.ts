import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = 'https://crud-dotnet-api20240919182651.azurewebsites.net';
  http = inject(HttpClient);
  constructor() {}

  createUser(user: IUser) {
    return this.http.post(this.apiUrl + '/api/Auth/register', user);
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(this.apiUrl + '/api/Auth/login', {
      email: email,
      password: password,
    });
  }
}
