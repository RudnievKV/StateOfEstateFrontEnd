import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, take, tap } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import CounterpartyCreateDto from '../models/CounterpartyDtos/CounterpartyCreateDto';
import CounterpartyDto from '../models/CounterpartyDtos/CounterpartyDto';
import CounterpartyUpdateDto from '../models/CounterpartyDtos/CounterpartyUpdateDto';
import PagedResponse from '../models/PagedResponse';

export const ACCESS_TOKEN_KEY = 'montenegro_access_token';
@Injectable({
  providedIn: 'root'
})
export class CounterpartyService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }

  GetCounterpartiesPaged(customParams: HttpParams): Observable<PagedResponse<CounterpartyDto>> {
    return this.http.get<PagedResponse<CounterpartyDto>>(`${this.apiUrl}api/counterparties`, {
      params: customParams
    });
  }
  GetCounterparty(id: number): Observable<CounterpartyDto> {
    return this.http.get<CounterpartyDto>(`${this.apiUrl}api/counterparties/${id}`)
  }
  GetAllCounterparties(): Observable<CounterpartyDto[]> {
    return this.http.get<CounterpartyDto[]>(`${this.apiUrl}api/counterparties/all`)
  }
  CreateCounterparty(counterparty: CounterpartyCreateDto): Observable<CounterpartyDto> {
    return this.http.post<CounterpartyDto>(`${this.apiUrl}api/counterparties`, counterparty);
  }
  UpdateCounterparty(counterparty: CounterpartyUpdateDto, id: number): Observable<CounterpartyDto> {
    return this.http.put<CounterpartyDto>(`${this.apiUrl}api/counterparties/${id}`, counterparty);
  }
  DeleteCounterparty(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/counterparties/${id}`);
  }

}
