import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, take, tap } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import { LocalDto } from '../models/LocalDtos/LocalDto';
import PagedResponse from '../models/PagedResponse';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }

  GetLocalsPaged(customParams: HttpParams): Observable<PagedResponse<LocalDto>> {
    return this.http.get<PagedResponse<LocalDto>>(`${this.apiUrl}api/locals`, {
      params: customParams
    });
  }
}
