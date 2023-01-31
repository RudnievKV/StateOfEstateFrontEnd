import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, take, tap } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import PagedResponse from '../models/PagedResponse';
import RealticAccountCreateDto from '../models/RealticAccountDtos/RealticAccountCreateDto';
import RealticAccountDto from '../models/RealticAccountDtos/RealticAccountDto';
import RealticAccountUpdateDto from '../models/RealticAccountDtos/RealticAccountUpdateDto';

export const ACCESS_TOKEN_KEY = 'montenegro_access_token';
@Injectable({
  providedIn: 'root'
})
export class RealticAccountService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }

  GetRealticAccountsPaged(customParams: HttpParams): Observable<PagedResponse<RealticAccountDto>> {
    return this.http.get<PagedResponse<RealticAccountDto>>(`${this.apiUrl}api/realticaccounts`, {
      params: customParams
    });
  }
  GetRealticAccount(id: number): Observable<RealticAccountDto> {
    return this.http.get<RealticAccountDto>(`${this.apiUrl}api/realticaccounts/${id}`)
  }
  GetAllRealticAccounts(): Observable<RealticAccountDto[]> {
    return this.http.get<RealticAccountDto[]>(`${this.apiUrl}api/realticaccounts/all`)
  }
  CreateRealticAccount(realticAccount: RealticAccountCreateDto): Observable<RealticAccountDto> {
    return this.http.post<RealticAccountDto>(`${this.apiUrl}api/realticaccounts`, realticAccount);
  }
  UpdateRealticAccount(realticAccount: RealticAccountUpdateDto, id: number): Observable<RealticAccountDto> {
    return this.http.put<RealticAccountDto>(`${this.apiUrl}api/realticaccounts/${id}`, realticAccount);
  }
  DeleteRealticAccount(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/realticaccounts/${id}`);
  }

}
