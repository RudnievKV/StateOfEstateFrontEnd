import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, take, tap } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import { CityCreateDto } from '../models/CityDtos/CityCreateDto';
import { CityDto } from '../models/CityDtos/CityDto';
import { CityUpdateDto } from '../models/CityDtos/CityUpdateDto';
import PagedResponse from '../models/PagedResponse';

export const ACCESS_TOKEN_KEY = 'montenegro_access_token';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }

  GetCitiesPaged(customParams: HttpParams): Observable<PagedResponse<CityDto>> {
    return this.http.get<PagedResponse<CityDto>>(`${this.apiUrl}api/cities`, {
      params: customParams
    });
  }
  GetCity(id: number): Observable<CityDto> {
    return this.http.get<CityDto>(`${this.apiUrl}api/cities/${id}`)
  }
  GetAllCities(): Observable<CityDto[]> {
    return this.http.get<CityDto[]>(`${this.apiUrl}api/cities/all`)
  }
  CreateCity(city: CityCreateDto): Observable<CityDto> {
    return this.http.post<CityDto>(`${this.apiUrl}api/cities`, city);
  }
  UpdateCity(city: CityUpdateDto, id: number): Observable<CityDto> {
    return this.http.put<CityDto>(`${this.apiUrl}api/cities/${id}`, city);
  }
  DeleteCity(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/cities/${id}`);
  }
  DeleteCities(customParams: HttpParams): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/cities`, {
      params: customParams
    });
  }
}
