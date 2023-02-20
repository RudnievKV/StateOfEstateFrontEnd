import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import UserTypeDto from '../models/UserTypeDtos/UserTypeDto';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }

  GetUserTypes(): Observable<Array<UserTypeDto>> {
    return this.http.get<Array<UserTypeDto>>(`${this.apiUrl}api/usertypes`);
  }
}
